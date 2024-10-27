package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.Experience;
import com.example.kshitiz.server.entity.Profile;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id;
    private String email;
    private String jobTitle;
//private String profileUrl;
    private String company;
    private String location;
    private String about;
    private List<String> skills;  // List of skills (string)
    private List<Experience> experiences;  // List of experiences

    public Profile toEntity() {
        Profile profile = new Profile();
        profile.setId(this.id);
        profile.setEmail(this.email);
        profile.setJobTitle(this.jobTitle);
        profile.setCompany(this.company);
        profile.setLocation(this.location);
        profile.setAbout(this.about);
        profile.setSkills(this.skills);
        profile.setExperiences(this.experiences);
        return profile;
    }
}
