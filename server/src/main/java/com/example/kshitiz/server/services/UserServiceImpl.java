package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;

import com.example.kshitiz.server.utils.GeneralExceptions;
import com.example.kshitiz.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service(value = "UserService")
class UserServiceImpl implements UserService {

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
        System.out.println("Attempting to login user: " + loginDTO.getEmail());
        User user=userRepository.findByEmail(loginDTO.getEmail());
        if(user==null){
            throw new GeneralExceptions.UserNotFoundException("User with email "+ loginDTO.getEmail()+ " not found");
        }

        if (!bcryptPasswordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new GeneralExceptions.InvalidCredentialsException("Invalid Credentials");
        }
//        String jwtToken=jwtService.generateToken(user.getEmail());
        UserDTO userDTO=user.toDTO();
//        userDTO.setToken(jwtToken);
        return userDTO;
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
