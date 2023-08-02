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
public class ContactDomain {
	int id;
	String relationship;
	boolean isReference;
	boolean isEmergency;
	boolean isLandlord;
	String name;
	String phone;
	String address;
	String email;
	int personId;
}
