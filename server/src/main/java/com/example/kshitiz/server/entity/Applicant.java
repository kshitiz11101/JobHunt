package com.example.kshitiz.server.entity;

import com.example.kshitiz.server.dto.ApplicationDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="applicants")
public class Applicant {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    @NotNull(message = "Name cannot be empty")
    private String name;
    @NotNull(message = "Email cannot be empty")
    @Email(message = "Email is not valid")
    private String email;
    @NotNull(message = "Phone number cannot be empty")
    @Size(min=10)
    private String phone;
    @NotNull(message = "Resume cannot be empty")
    private String resume;
    @NotNull(message = "Portfolio cannot be empty")
    private String portfolio;
    private String linkedIn;
    private String coverLetter;

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;

    public ApplicationDTO toDTO(){
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(id);
        dto.setName(name);
        dto.setEmail(email);
        dto.setPhone(phone);
        dto.setResume(resume);
        dto.setPortfolio(portfolio);
        dto.setLinkedIn(linkedIn);
        dto.setCoverLetter(coverLetter);
        dto.setJobId(this.job!=null?job.getId():null);
        return dto;
    }



}
