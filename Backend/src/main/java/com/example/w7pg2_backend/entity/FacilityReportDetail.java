package com.example.w7pg2_backend.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="FacilityReportDetail")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FacilityReportDetail implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;
	
	@ManyToOne
	@JoinColumn(name="reportId")
	FacilityReport facilityReport;
	
	@Column(name = "comment")
	String comment;
	
	@Column(name = "createdDate")
	String createdDate;
	
	@Column(name = "lastModificationDate")
	String lastModificationDate;
}
