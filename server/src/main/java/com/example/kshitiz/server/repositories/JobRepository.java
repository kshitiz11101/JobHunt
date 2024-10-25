package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {
    Job findById(long id);
    List<Job> findByPostedById(Long userId);
}
