package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OnboardSection1Domain {
	PersonDomain person;
	AddressDomain address;
}
