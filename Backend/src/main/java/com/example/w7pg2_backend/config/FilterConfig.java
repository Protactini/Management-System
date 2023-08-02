package com.example.w7pg2_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.w7pg2_backend.security.filter.AdminFilter;
import com.example.w7pg2_backend.security.filter.JwtFilter;

import java.util.Collections;

@Configuration
public class FilterConfig {
    @Value("${services.auth.login}")
    private String authLoginUrl;

    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {
        final FilterRegistrationBean<JwtFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new JwtFilter());
        filterFilterRegistrationBean.setInitParameters(Collections.singletonMap("authLoginUrl", authLoginUrl));
        // The difference between /* & /** is that the second matches the entire directory tree, including subdirectories, where as /* only matches at the level it's specified at.
        filterFilterRegistrationBean.addUrlPatterns("/profile/*");
        filterFilterRegistrationBean.setOrder(1);
        return filterFilterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<AdminFilter> adminFilter(){
        final FilterRegistrationBean<AdminFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new AdminFilter());
        filterFilterRegistrationBean.setInitParameters(Collections.singletonMap("authLoginUrl", authLoginUrl));
        filterFilterRegistrationBean.addUrlPatterns("/profile/all");
        filterFilterRegistrationBean.setOrder(2);
        return filterFilterRegistrationBean;
    }
}
