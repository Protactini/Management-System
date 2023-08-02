package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OnboardSection2Domain {
	EmployeeDomain employee;
	VisaStatusDomain visaStatus;
}
