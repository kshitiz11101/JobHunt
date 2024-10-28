package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.ApplicationDTO;
import com.example.kshitiz.server.entity.Applicant;
import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.UserRepository;
import com.example.kshitiz.server.services.ApplicantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/applicant")
public class ApplicantController {
    @Autowired
    private ApplicantService applicantService;
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/applyJob/{jobId}")
    public ResponseEntity<ApplicationDTO> applyJob(@PathVariable Long jobId,@Valid @RequestBody ApplicationDTO applicationDTO) {
        Applicant applicant =applicationDTO.toEntity();


        User user=userRepository.findByEmail(applicant.getEmail());
        if(!Objects.equals(user.getEmail(), applicant.getEmail())){
            throw new RuntimeException("User email doesn't match with applicant email");
        }
        if(!user.getName().equals(applicant.getName())){
            throw new RuntimeException("User name doesn't match with applicant name");
        }
        Job job=new Job();
        job.setId(jobId);
        applicant.setJob(job);
        applicantService.applyJob(applicant);
        ApplicationDTO createdApplicationDTO =applicant.toDTO();
        return new ResponseEntity<>(createdApplicationDTO, HttpStatus.CREATED);
    }

    @GetMapping("/getAllApplicants/{jobId}")
    public ResponseEntity<List<ApplicationDTO>> getAllApplicants(@PathVariable Long jobId) {
    List<Applicant> applicants=applicantService.getApplicants(jobId);
    List<ApplicationDTO> applicationDTOS=applicants.stream()
            .map(Applicant:: toDTO).collect(Collectors.toList());
    return new ResponseEntity<>(applicationDTOS, HttpStatus.OK);
    }
}
