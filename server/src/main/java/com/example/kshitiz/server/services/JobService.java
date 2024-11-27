package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;

import java.util.List;

public interface JobService {
    Job createJob(Job job);
    Job getJob(Long id);
    Job updateJob(Job job);
    void deleteJob(Long id);
    List<Job> getAllJobs();
    List<Job> searchJobs(String title, String location, String experience, String jobType);
    List<Job> getJobsByUser(Long userId);
}
