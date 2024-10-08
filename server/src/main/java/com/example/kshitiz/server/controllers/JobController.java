package com.example.kshitiz.server.controllers;


import com.example.kshitiz.server.dto.JobDTO;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.services.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @PostMapping("/addJob")
    public ResponseEntity<JobDTO> addJob(@Valid @RequestBody JobDTO jobDTO) {
        Job job=jobDTO.toEntity();
        Job createdJob=jobService.createJob(job);

        JobDTO createdJobDTO=createdJob.toDTO();
        return new ResponseEntity<>(createdJobDTO, HttpStatus.CREATED);
    }

    @PutMapping("/updateJob/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id, @RequestBody JobDTO jobDTO) {
        Job job=jobDTO.toEntity();
        job.setId(id);
        Job updatedJob=jobService.updateJob(job);
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
    @DeleteMapping("/deleteJob/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        Job job=jobService.getJob(id);
        if(job==null){
            throw new RuntimeException("Job not found with id "+id);
        }
            jobService.deleteJob(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
