package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import jakarta.mail.MessagingException;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO);
    public UserDTO loginUser(LoginDTO loginDTO);
//    public boolean sendOtp(String email) throws MessagingException;
//
    public UserDTO getUserByEmail(String email);
    public UserDTO getUserById(Long id);
//    public UserDTO loadUserByUsername(String name);

}
