package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Applicant;
import com.example.kshitiz.server.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    List<Applicant> findByJob(Job job);
   Optional< Applicant> findByEmailAndJob(String email, Job job);
}
