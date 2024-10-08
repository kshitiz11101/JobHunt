package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.Job;
import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private long id;
    private String jobTitle;
    private String company;
    private String experience;
    private String jobType;
    private List<String> skillsRequired;
    private String salary;
    private String location;

    public Job toEntity() {
        Job job = new Job();
        job.setId(this.id);
        job.setJobTitle(this.jobTitle);
        job.setCompany(this.company);
        job.setExperience(this.experience);
        job.setJobType(this.jobType);
        job.setSkillsRequired(this.skillsRequired);
        job.setSalary(this.salary);
        job.setLocation(this.location);
        return job;
    }
}
