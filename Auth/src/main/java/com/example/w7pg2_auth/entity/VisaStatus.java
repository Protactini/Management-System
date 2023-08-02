package com.example.w7pg2_auth.entity;

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
	@Column(name = "id")
	int id;
	
	@Column(name = "visaType")
	String visaType;
	
	@Column(name = "visaStartDate")
	String visaStartDate;
	
	@Column(name = "visaEndDate")
	String visaEndDate;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "visaStatus", cascade = CascadeType.MERGE)
    private Employee employee;

}
