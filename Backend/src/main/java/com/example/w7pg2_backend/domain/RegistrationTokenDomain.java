package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RegistrationTokenDomain {
	int id;
	String token;
	String validDuration;
	String email;
	int createdBy;
}
