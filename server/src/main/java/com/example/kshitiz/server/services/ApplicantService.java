package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Applicant;

import java.util.List;

public interface ApplicantService{
    public Applicant applyJob(Applicant applicant);
    public List<Applicant> getApplicants(Long jobId);
}
