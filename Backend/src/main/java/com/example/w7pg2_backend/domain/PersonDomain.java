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
@Builder
@ToString
public class PersonDomain {
	int id;
	String firstName;
	String lastName;
	String middleName;
	String email;
	String cellPhone;
	String alternatePhone;
	String gender;
	String ssn;
	String dob;
	int userId;
}
