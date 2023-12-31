package com.example.w7pg2_backend.security.filter;

import com.example.w7pg2_backend.constant.JwtConstant;
import com.example.w7pg2_backend.security.util.CookieUtil;
import com.example.w7pg2_backend.security.util.JwtUtil;

import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        String token = CookieUtil.getValue(req, JwtConstant.JWT_COOKIE_NAME);
        System.out.println("+++++++++JwtFilter++++++++");
        System.out.println(token);
        if (token!=null) {
            String userName = JwtUtil.getSubjectFromJwt(token);
            System.out.println(userName);
            String role = null;
            Claims claims = JwtUtil.getClaimsFromJwt(token);
            if(claims!=null){
                role = claims.get("role").toString();
            }
            if (userName!=null) {
                req.setAttribute("userName", userName);
                req.setAttribute("role",role);
                filterChain.doFilter(req, res);
            } else {
                String authLoginUrl = getFilterConfig().getInitParameter("authLoginUrl");
                res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
            }
        } else {
            String authLoginUrl = getFilterConfig().getInitParameter("authLoginUrl");
            res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
        }
    }

}
