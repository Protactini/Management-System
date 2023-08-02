package com.example.w7pg2_backend.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDomain {
	int id;
	int personId;
	int managerId;
	String startDate;
	String endDate;
	String avartar;
	String car;
	String dl;
	String dlExpirationDate;
	int houseId;
	int visaStatusId;
}
