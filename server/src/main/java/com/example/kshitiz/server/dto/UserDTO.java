package com.example.kshitiz.server.dto;

import com.example.kshitiz.server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String password;
    private AccountType accountType;
    private String jwtToken;

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.accountType);
    }
}
