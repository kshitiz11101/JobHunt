package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.utils.GeneralExceptions;
import com.example.kshitiz.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service(value = "UserService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDTO registerUser(UserDTO userDTO) {

        User user=userDTO.toEntity();
        user.setPassword(bcryptPasswordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return user.toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        User user=userRepository.findByEmail(loginDTO.getEmail());
        if(user==null){
            throw new GeneralExceptions.UserNotFoundException("User with email "+ loginDTO.getEmail()+ " not found");
        }

        if (!bcryptPasswordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new GeneralExceptions.InvalidCredentialsException("Invalid Credentials");
        }
        return user.toDTO();
    }
}
