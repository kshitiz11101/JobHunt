package com.example.kshitiz.server.utils;

public class GeneralExceptions {
     public static class UserNotFoundException extends RuntimeException {
         public UserNotFoundException(String message) {
             super(message);
         }
     }
     public static class InvalidCredentialsException extends RuntimeException {
         public InvalidCredentialsException(String message) {
             super(message);
         }

     }
}
