package com.example.w7pg2_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AddressDomain {
	int id;
	String addressLine1;
	String addressLine2;
	String city;
	String zipCode;
	String stateName;
	int personId;
}
