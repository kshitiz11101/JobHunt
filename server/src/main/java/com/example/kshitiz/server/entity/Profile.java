package com.example.kshitiz.server.entity;

import com.example.kshitiz.server.dto.ProfileDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;
    private String jobTitle;
//    private String profileUrl;
    private String company;
    private String location;
    private String about;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;


    // Storing skills as a list of strings
    @ElementCollection
    @Size(min=1)
    private List<String> skills = new ArrayList<>();

    // Bidirectional mapping of experiences
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences = new ArrayList<>();

    public ProfileDTO toDTO() {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(this.id);
        dto.setEmail(this.email);
        dto.setJobTitle(this.jobTitle);
//        dto.setProfileUrl(this.profileUrl);
        dto.setCompany(this.company);
        dto.setLocation(this.location);
        dto.setAbout(this.about);
        dto.setSkills(this.skills);
        dto.setExperiences(this.experiences);
        return dto;
    }
}
