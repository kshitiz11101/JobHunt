package com.example.kshitiz.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    @NotBlank(message = "Email can't be null or blank")
    @Email(message = "Email is invalid")
    private String email;
    @NotBlank(message = "Password is blank or null")
    private String password;
}

