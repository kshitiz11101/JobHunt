package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;

import com.example.kshitiz.server.utils.GeneralExceptions;
import com.example.kshitiz.server.repositories.UserRepository;
import com.example.kshitiz.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service(value = "UserService")
class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    private final BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDTO registerUser(UserDTO userDTO) {

        User user=userDTO.toEntity();
        user.setPassword(bcryptPasswordEncoder.encode(userDTO.getPassword()));
        userRepository.saveAndFlush(user);
        return user.toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
      User user=userRepository.findByEmail(loginDTO.getEmail());
        if (user!=null) {
            // Convert user entity to DTO
            UserDTO userDTO = user.toDTO();
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail());
            userDTO.setJwtToken(token);

            return userDTO;
        }

        return null;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new GeneralExceptions.UserNotFoundException("User with email "+ email+ " not found");
        }
        return user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user=userRepository.findById(id).orElseThrow(()->new GeneralExceptions.UserNotFoundException("User with id "+id+" not found"));
        return user.toDTO();
    }

    public static String generateOTP(){
        StringBuilder otp=new StringBuilder();
        SecureRandom random=new SecureRandom();
        for(int i=0;i<6;i++){
            otp.append(random.nextInt(10));

        }
        return otp.toString();
    }


}
