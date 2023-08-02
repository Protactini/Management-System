package com.example.w7pg2_auth.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="FacilityReport")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FacilityReport implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;
	
	@Column(name = "title")
	String title;
	
	@ManyToOne
	@JoinColumn(name="employeeId")
	Employee employee;
	
	@Column(name = "reportDate")
	String reportDate;
	
	@Column(name = "description")
	String description;
	
	@Column(name = "status")
	String status;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "facilityReport", cascade = CascadeType.MERGE)
    private Set<FacilityReportDetail> facilityReportDetail;
	
}
