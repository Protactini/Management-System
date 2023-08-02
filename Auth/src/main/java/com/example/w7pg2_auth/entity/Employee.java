package com.example.w7pg2_auth.entity;

import java.io.Serializable;
import java.util.Set;
import org.hibernate.annotations.Type;
import lombok.*;
import javax.persistence.*;


@Entity
@Table(name="Employee")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Employee implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;

	@OneToOne
	@JoinColumn(name="personId")
	Person person;

	@ManyToOne
	@JoinColumn(name="managerId")
	Employee manager;
	
	@Column(name = "startDate")
	String startDate;
	
	@Column(name = "endDate")
	String endDate;

	@Column(name = "avartar")
	String avartar;

	@Column(name = "car")
	String car;

	@Column(name = "driverLisence")
	String dl;

	@Column(name = "driverLisence_ExpirationDate")
	String dlExpirationDate;

	@ManyToOne
	@JoinColumn(name="HouseID")
	House house;
	
	@OneToOne
	@JoinColumn(name="visaStatusId")
	VisaStatus visaStatus;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "employee", cascade = CascadeType.MERGE)
    private Set<PersonalDocument> personalDocument;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "createdBy", cascade = CascadeType.MERGE)
    private RegistrationToken registrationToken;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "employee", cascade = CascadeType.MERGE)
    private Set<FacilityReport> facilityReport;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "employee", cascade = CascadeType.MERGE)
    private Set<ApplicationWorkFlow> applicationWorkFlow;
//
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "manager", cascade = CascadeType.MERGE)
    private Set<Employee> subordinates;

}
