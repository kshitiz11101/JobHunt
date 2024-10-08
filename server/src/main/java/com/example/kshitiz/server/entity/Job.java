package com.example.kshitiz.server.entity;

import com.example.kshitiz.server.dto.JobDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
        return jobDTO;
    }
}
