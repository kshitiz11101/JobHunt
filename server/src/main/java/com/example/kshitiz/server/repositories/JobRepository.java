package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Long> {
    Job findById(long id);
}
