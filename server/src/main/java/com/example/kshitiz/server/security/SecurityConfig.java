package com.example.kshitiz.server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class SecurityConfig {


//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf->csrf.disable())
//                .authorizeHttpRequests(auth->auth
//                .requestMatchers("/auth/login").permitAll() // Allow login and register endpoints
//                .anyRequest().authenticated())
//                .exceptionHandling(ex->ex.authenticationEntryPoint(authenticationEntryPoint))
//                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class);
//        return http.build();
//    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


  
}
