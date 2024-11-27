package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    Job findById(long id);
    List<Job> findByPostedById(Long userId);

}
