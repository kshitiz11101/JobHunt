package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Job;

import java.util.List;

public interface JobService {
    Job createJob(Job job);
    Job getJob(Long id);
    Job updateJob(Job job);
    void deleteJob(Long id);
    List<Job> getAllJobs();
}
