package com.example.kshitiz.server.controllers;

import com.example.kshitiz.server.dto.ProfileDTO;
import com.example.kshitiz.server.entity.Experience;
import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.UserRepository;


import com.example.kshitiz.server.services.ProfileService;
import com.example.kshitiz.server.utils.GeneralExceptions;
import com.example.kshitiz.server.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@CrossOrigin
@RequestMapping("/profiles")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping(value = "/addProfile/{userId}")
    public ResponseEntity<ProfileDTO> addProfile(@PathVariable Long userId, @RequestHeader("Authorization") String token,

                                                 @RequestBody ProfileDTO profileDTO) throws IOException {
        // validate token
        String extractedEmail=jwtUtil.extractEmail(token.replace("Bearer ", ""));

        // Fetch the user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if(!user.getEmail().equals(extractedEmail)) {
            throw new RuntimeException("Unauthorized access: Token doesn't match");
        }
        if(!profileDTO.getEmail().equals(extractedEmail)) {
            throw new RuntimeException("Unauthorized access: Email doesn't match");
        }

        Profile profile = profileDTO.toEntity();

//        String imageUrl=cloudinaryService.uploadImage(file);
//        profile.setProfileUrl(imageUrl);
        profile.setUser(user);
        // Set the user's email in the profile (since each profile belongs to a user)
        profile.setEmail(user.getEmail());
        if (profile.getExperiences() != null) {
            for (Experience experience : profile.getExperiences()) {
                experience.setProfile(profile);
            }
        }

        Profile createdProfile = profileService.createProfile(profile);


        ProfileDTO createdProfileDTO = createdProfile.toDTO();

        return new ResponseEntity<>(createdProfileDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileDTO> getProfileByUserId(@PathVariable Long userId){
       Profile profile=profileService.getProfileByUserId(userId);

       ProfileDTO createdProfileDTO=profile.toDTO();
       return new ResponseEntity<>(createdProfileDTO, HttpStatus.OK);
    }

    @PutMapping("/updateProfile/{userId}")
    public ResponseEntity<ProfileDTO> updateProfile(@PathVariable Long userId, @RequestHeader("Authorization") String token,
                                                    @RequestBody ProfileDTO profileDTO){

        // validate token
        String extractedEmail=jwtUtil.extractEmail(token.replace("Bearer ", ""));

        User user=userRepository.findById(userId).orElseThrow(()-> new GeneralExceptions.UserNotFoundException("User not found with id:" +userId));

        if (!user.getEmail().equals(extractedEmail)) {
            throw new RuntimeException("Unauthorized access: Token does not match the user");
        }
        Profile existingProfile = profileService.getProfileByUserId(userId);
        if (existingProfile == null) {
            throw new GeneralExceptions.UserNotFoundException("Profile not found with user id: " + userId);
        }
        if(!profileDTO.getEmail().equals(extractedEmail)) {
            throw new RuntimeException("Unauthorized access: Email doesn't match");
        }

        existingProfile.setJobTitle(profileDTO.getJobTitle());
        existingProfile.setCompany(profileDTO.getCompany());
        existingProfile.setLocation(profileDTO.getLocation());
        existingProfile.setAbout(profileDTO.getAbout());
        existingProfile.setSkills(profileDTO.getSkills());

        existingProfile.getExperiences().clear();


        if (profileDTO.getExperiences() != null) {
            for (Experience newExperience : profileDTO.toEntity().getExperiences()) {
                newExperience.setProfile(existingProfile);
                existingProfile.getExperiences().add(newExperience);
            }
        }
        Profile updatedProfile=profileService.createProfile(existingProfile);
        ProfileDTO updatedProfileDTO = updatedProfile.toDTO();
        return new ResponseEntity<>(updatedProfileDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long profileId) {
        Profile profile = profileService.getProfile(profileId);
        if (profile == null) {
            throw new GeneralExceptions.UserNotFoundException("User not found with profile id: " + profileId);
        }
        profileService.deleteProfile(profileId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
