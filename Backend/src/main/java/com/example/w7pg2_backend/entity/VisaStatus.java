package com.example.w7pg2_backend.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="VisaStatus")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class VisaStatus implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "VisaType")
	String visaType;
	
	@Column(name = "VisaStartDate")
	String visaStartDate;
	
	@Column(name = "VisaEndDate")
	String visaEndDate;
	
	@Column(name = "StageNum")
	Integer stageNum;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "visaStatus", cascade = CascadeType.MERGE)
    private Employee employee;

}
