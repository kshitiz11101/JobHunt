package com.example.kshitiz.server.controllers;


import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.services.JobService;
import com.example.kshitiz.server.services.UserService;
import com.example.kshitiz.server.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/addJob")
    public ResponseEntity<JobDTO> addJob(@RequestHeader("Authorization") String token,   @Valid @RequestBody JobDTO jobDTO) {
        String email=jwtUtil.extractEmail(token.replace("Bearer ",""));

        User user= userService.getUserByEmail(email).toEntity();
        if(user.getAccountType()!= AccountType.EMPLOYER){
            throw new RuntimeException("Invalid token");
        }
        Job job=jobDTO.toEntity();
        job.setPostedBy(user);
        Job createdJob=jobService.createJob(job);

        JobDTO createdJobDTO=createdJob.toDTO();
        return new ResponseEntity<>(createdJobDTO, HttpStatus.CREATED);
    }

    @PutMapping("/updateJob/{id}")
    public ResponseEntity<JobDTO> updateJob(@RequestHeader("Authorization") String token,  @PathVariable Long id, @RequestBody JobDTO jobDTO) {
        String email=jwtUtil.extractEmail(token.replace("Bearer ",""));
        User user= userService.getUserByEmail(email).toEntity();

        if(user.getAccountType()!= AccountType.EMPLOYER){
           throw new RuntimeException("Invalid token");

        }
        Job job=jobService.getJob(id);
        System.out.println(job);
        if (job == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Job updatedJobEntity = jobDTO.toEntity();
        updatedJobEntity.setId(id); // Ensure the ID is set
        updatedJobEntity.setPostedBy(job.getPostedBy()); // Retain the original 'postedBy'


        Job updatedJob = jobService.updateJob(updatedJobEntity);
        JobDTO updatedJobDTO = updatedJob.toDTO();

        return new ResponseEntity<>(updatedJobDTO, HttpStatus.OK);
    }
    @GetMapping("/getJob/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) {
        Job job=jobService.getJob(id);
        if(job==null){
            throw new RuntimeException("Job not found with id "+id);
        }
        JobDTO createdJobDTO=job.toDTO();
        return new ResponseEntity<>(createdJobDTO, HttpStatus.OK);
    }
    @GetMapping("/postedJobs")
    public ResponseEntity<List<JobDTO>> postedJobs(@RequestHeader("Authorization") String token){
        String email=jwtUtil.extractEmail(token.replace("Bearer ",""));
        User user=userService.getUserByEmail(email).toEntity();
        List<Job> userJobs=jobService.getJobsByUser(user.getId());
        List<JobDTO> jobDTOs = userJobs.stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(jobDTOs, HttpStatus.OK);

    }
    @GetMapping("/getAllJobs")
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<Job> jobs=jobService.getAllJobs();
        List<JobDTO> jobDTOs=jobs.stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(jobDTOs, HttpStatus.OK);
    }
    @DeleteMapping("/deleteJob/{id}")
    public ResponseEntity<Void> deleteJob(@RequestHeader("Authorization") String token,  @PathVariable Long id) {
        String email=jwtUtil.extractEmail(token.replace("Bearer ",""));
        User user= userService.getUserByEmail(email).toEntity();
        if(user.getAccountType()!= AccountType.EMPLOYER){
            throw new RuntimeException("Invalid token");
        }
        Job job=jobService.getJob(id);
       if(job==null){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
            jobService.deleteJob(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/searchJobs")
    public ResponseEntity<List<JobDTO>> searchJobs(  @RequestParam(required = false) String title,
                                                     @RequestParam(required = false) String location,
                                                     @RequestParam(required = false) String experience,
                                                     @RequestParam(required = false) String jobType) {
        List<Job> jobs=jobService.searchJobs(title,location,experience,jobType);
        List<JobDTO> jobDTOs=jobs.stream()
                .map(Job::toDTO)
                .toList();
        return new ResponseEntity<>(jobDTOs, HttpStatus.OK);

    }

}
