package com.example.kshitiz.server.controllers;


import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.services.JobService;
import com.example.kshitiz.server.services.UserService;
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

    @PostMapping("/addJob/{userId}")
    public ResponseEntity<JobDTO> addJob(@PathVariable Long userId,   @Valid @RequestBody JobDTO jobDTO) {
        User user= userService.getUserById(userId).toEntity();
        if(user.getAccountType()!= AccountType.EMPLOYER){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Job job=jobDTO.toEntity(user);
        job.setPostedBy(user);
        Job createdJob=jobService.createJob(job);

        JobDTO createdJobDTO=createdJob.toDTO();
        return new ResponseEntity<>(createdJobDTO, HttpStatus.CREATED);
    }

    @PutMapping("/updateJob/{id}/{userId}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long userId,  @PathVariable Long id, @RequestBody JobDTO jobDTO) {
        User user= userService.getUserById(userId).toEntity();
        Job job=jobService.getJob(id);
        System.out.println(job);
        if (job == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (job.getPostedBy()==null || job.getPostedBy().getId()!=user.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        jobDTO.setId(id);

        Job updatedJob=jobService.updateJob(jobDTO.toEntity(user));
        JobDTO createdJobDTO=updatedJob.toDTO();
        return new ResponseEntity<>(createdJobDTO, HttpStatus.OK);
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
    @GetMapping("/getAllJobs")
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<Job> jobs=jobService.getAllJobs();
        List<JobDTO> jobDTOs=jobs.stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(jobDTOs, HttpStatus.OK);
    }
    @DeleteMapping("/deleteJob/{id}/{userId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long userId,  @PathVariable Long id) {
        User user= userService.getUserById(userId).toEntity();
        Job job=jobService.getJob(id);
       if(job==null){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
       if(job.getPostedBy()==null || job.getPostedBy().getId()!=user.getId()) {
           return new ResponseEntity<>(HttpStatus.FORBIDDEN);
       }
            jobService.deleteJob(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/getJobsByUser/{userId}")
    public ResponseEntity<List<JobDTO>> getJobsByUser(@PathVariable Long userId) {
        User user=userService.getUserById(userId).toEntity();
        List<Job> jobs = jobService.getJobsByUser(userId);
        List<JobDTO> jobDTOS=jobs.stream().map(Job::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(jobDTOS, HttpStatus.OK);
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
