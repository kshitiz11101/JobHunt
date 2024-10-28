package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.entity.Applicant;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ApplicantRepository;
import com.example.kshitiz.server.repositories.JobRepository;
import com.example.kshitiz.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ApplicantServiceImpl implements ApplicantService {
    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Applicant applyJob(Applicant applicant) {
        User user = userRepository.findByEmail(applicant.getEmail());
        if(!Objects.equals(user.getEmail(), applicant.getEmail())){
            throw new RuntimeException("Applicant email doesn't match");
        }

        if(user.getAccountType()!= AccountType.APPLICANT){
            throw new RuntimeException("User must be an APPLICANT to apply");
        }
        Job job=jobRepository.findById(applicant.getJob().getId());
        if(job.getId()!=applicant.getJob().getId()){
            throw new RuntimeException("Job id doesn't match");
        }
       Optional< Applicant> existingApplicant=applicantRepository.findByEmailAndJob(applicant.getEmail(),job);
        if(existingApplicant.isPresent()){
            throw new RuntimeException("Applicant has applied already!");
        }
        applicant.setJob(job);
       return applicantRepository.save(applicant);

    }

    @Override
    public List<Applicant> getApplicants(Long jobId) {
        Job job=jobRepository.findById(jobId).orElseThrow(()-> new RuntimeException("Job not found with id: "+ jobId));
       return applicantRepository.findByJob(job);
    }
}
