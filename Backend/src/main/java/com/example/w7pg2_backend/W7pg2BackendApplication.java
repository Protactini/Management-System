package com.example.w7pg2_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
@EnableAutoConfiguration(exclude = { HibernateJpaAutoConfiguration.class })
public class W7pg2BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(W7pg2BackendApplication.class, args);
	}

}
