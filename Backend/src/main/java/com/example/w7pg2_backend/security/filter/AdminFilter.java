package com.example.w7pg2_backend.security.filter;


import com.example.w7pg2_backend.constant.JwtConstant;

import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AdminFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("+++++++++AdminFilter++++++++");
        String role = (String)req.getAttribute("role");
        if(role!=null&& role.equals("Admin")){
            filterChain.doFilter(req, res);
        } else {
            String authLoginUrl = getFilterConfig().getInitParameter("authLoginUrl");
            res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
        }
    }

}
