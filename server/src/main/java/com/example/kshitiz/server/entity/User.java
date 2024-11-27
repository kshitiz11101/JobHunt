package com.example.kshitiz.server.entity;

import com.example.kshitiz.server.dto.AccountType;
import com.example.kshitiz.server.dto.UserDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.util.Collection;
import java.util.Collections;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank(message = "Name cannot be empty")
    private String name;
    @Column(unique=true)
    @NotBlank(message = "Email can't be null or blank")
    @Email(message = "Email is invalid")
    private String email;
    @NotBlank(message = "Password is blank or null")
    @Size(min = 6)
    private String password;
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Account Type cannot be null or empty")
    private AccountType accountType;
//
    public UserDTO toDTO(){
        return new UserDTO(this.id,this.name,this.email,this.password,this.accountType,null);
    }
}
