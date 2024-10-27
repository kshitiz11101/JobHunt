package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.entity.User;
import com.example.kshitiz.server.repositories.ProfileRepository;
import com.example.kshitiz.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "ProfileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Profile createProfile(Profile profile) {
       return profileRepository.save(profile);
    }

    @Override
    public Profile getProfile(long id) {
        return profileRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteProfile(long id) {
        profileRepository.deleteById(id);
    }

    @Override
    public Profile getProfileByUserId(Long userId) {
      User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found with id:"+ userId));
      return profileRepository.findByUser(user);

    }
}
