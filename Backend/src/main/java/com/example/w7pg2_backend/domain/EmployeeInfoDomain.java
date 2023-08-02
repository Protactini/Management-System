package com.example.w7pg2_backend.domain;

import java.util.List;

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
public class EmployeeInfoDomain {
	EmployeeDomain employee;
	ApplicationWorkFlowDomain applicationWorkFlow;
	PersonDomain person;
	AddressDomain address;
	List<ContactDomain> contacts;
	VisaStatusDomain visaStatus;
}
