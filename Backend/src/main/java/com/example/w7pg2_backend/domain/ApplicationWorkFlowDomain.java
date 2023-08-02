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
public class ApplicationWorkFlowDomain {
	int id;
	int employeeId;
	String type;
	String status;
	String comment;
}
