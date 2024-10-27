package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.ProfileDTO;
import com.example.kshitiz.server.entity.Profile;

public interface ProfileService {
    Profile createProfile(Profile profile);
    Profile getProfile(long id);
    void deleteProfile(long id);
    Profile getProfileByUserId(Long userId);
}
