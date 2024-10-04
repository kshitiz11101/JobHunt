package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO);
    public UserDTO loginUser(LoginDTO loginDTO);
}
