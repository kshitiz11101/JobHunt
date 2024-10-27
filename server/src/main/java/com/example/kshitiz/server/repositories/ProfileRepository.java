package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByEmail(String email);
    Profile findByUser(User user);
}
