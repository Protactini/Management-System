package com.example.w7pg2_auth.controller;

import com.example.w7pg2_auth.constant.JwtConstant;
import com.example.w7pg2_auth.domain.UserDomain;
import com.example.w7pg2_auth.entity.User;
import com.example.w7pg2_auth.security.CookieUtil;
import com.example.w7pg2_auth.security.JwtUtil;
import com.example.w7pg2_auth.service.UserService;

import io.jsonwebtoken.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class LoginController {
	
	@Autowired
    private UserService userService;

//    @PostMapping("/register")
//    public String register(@RequestBody User user) {
//        userService.create(user);
//        return "Hello, " + user.getUserName();
//    }

    @PostMapping("/login")
    public String login(HttpServletResponse res, @RequestBody UserDomain userDomain) {
        // failing to login will redirect to login
        if (userDomain.getUserName() == null || userDomain.getPassword() == null) {
            return "CredentialError: Invalid user name or password!";
        }

        try {
	        User user = userService.checkLogin(userDomain.getUserName(), userDomain.getPassword());
	        if (user == null) {
	        	throw new Exception("Password is incorrect");
	        }
	        // if successful, generate token for that user with their id and email
	        String jwt = JwtUtil.generateToken(userDomain.getEmail(), JwtConstant.JWT_VALID_DURATION, user.getId(), 
	        		user.getEmail(), user.getRole().getId());
	        CookieUtil.create(res, JwtConstant.JWT_COOKIE_NAME, jwt, false, -1, "localhost");
	        return "Login successfully!";
        } catch (Exception e) {
        	return e.toString();
        }
    }

    @GetMapping("/logout")
    public String logout(HttpServletResponse res) {
        CookieUtil.clear(res, JwtConstant.JWT_COOKIE_NAME, "localhost");
        return "Logged out";
    }
    
    @GetMapping("/gettokendata")
    public Claims getTokenData(HttpServletRequest req) {
    	return JwtUtil.getSubjectFromJwt(CookieUtil.getValue(req, "JWT-TOKEN"));
    }
}
