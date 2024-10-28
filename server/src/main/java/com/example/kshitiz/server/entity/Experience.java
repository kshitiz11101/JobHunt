package com.example.kshitiz.server.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String company;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="profile_id")
    @JsonIgnore
    private Profile profile;
}