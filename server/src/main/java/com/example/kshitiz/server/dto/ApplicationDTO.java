package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.Applicant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {
    private long id;
    private String name;
    private String email;
    private String phone;
    private String resume;
    private String portfolio;
    private String linkedIn;
    private Long jobId;
    private String coverLetter;
    public Applicant toEntity() {
        Applicant applicant = new Applicant();
        applicant.setId(this.id);
        applicant.setName(this.name);
        applicant.setEmail(this.email);
        applicant.setPhone(this.phone);
        applicant.setResume(this.resume);
        applicant.setPortfolio(this.portfolio);
        applicant.setLinkedIn(this.linkedIn);
        applicant.setCoverLetter(this.coverLetter);
        return applicant;
    }
}
