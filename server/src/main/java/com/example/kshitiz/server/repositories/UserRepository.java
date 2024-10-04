package com.example.kshitiz.server.repositories;

import com.example.kshitiz.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  public User findByEmail(String email);
//    Optional<User> findByAccountType(AccountType accountType);
}
