package com.example.kshitiz.server.entity;

import com.example.kshitiz.server.dto.JobDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name="jobs")
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
   @NotNull(message = "Company cannot be null or empty")
    private String company;
    @NotNull(message = "Title cannot be null or empty")
    private String jobTitle;
    @NotNull(message = "Experience cannot be null or empty")
    private String experience;
    @NotNull(message = "Job Type cannot be null or empty")
    private String jobType;
    @ElementCollection
    @NotNull(message = "Skills cannot be null or empty")
    @Size(min = 1 ,message = "Skills cannot be empty")
    private List<String> skillsRequired=new ArrayList<>();
    @NotNull(message = "Salary cannot be null or empty")
    private String salary;
    @NotNull(message = "Location cannot be null or empty")
    private String location;
    @NotNull(message = "No. of applicants can't be null or empty")
    private Long applicants;
    @NotNull(message = "Description can't be null or empty")
    private String description;
    @NotNull(message = "No. of days posted ago can't be null or empty")
    private LocalDate postedOn;
    private String responsibilities;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User postedBy;




    public JobDTO toDTO() {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(this.id);
        jobDTO.setJobTitle(this.jobTitle);
        jobDTO.setCompany(this.company);
        jobDTO.setExperience(this.experience);
        jobDTO.setJobType(this.jobType);
        jobDTO.setSkillsRequired(this.skillsRequired);
        jobDTO.setSalary(this.salary);
        jobDTO.setLocation(this.location);
        jobDTO.setApplicants(this.applicants);
        jobDTO.setDescription(this.description);
        jobDTO.setPostedOn(this.postedOn);
        jobDTO.setResponsibilities(this.responsibilities);
        jobDTO.setPostedBy(this.postedBy.getName());
        return jobDTO;
    }
}
