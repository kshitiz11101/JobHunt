package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private Long applicants;
    private String description;
    private String responsibilities;
    private LocalDate postedOn;
    private String postedBy;



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
        job.setApplicants(this.applicants);
        job.setDescription(this.description);
        job.setPostedOn(this.postedOn);
        job.setResponsibilities(this.responsibilities);

        return job;
    }
}
