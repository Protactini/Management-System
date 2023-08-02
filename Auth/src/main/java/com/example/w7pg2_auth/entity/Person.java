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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="Person")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString
@Builder
public class Person implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "FirstName")
	String firstName;
	
	@Column(name = "LastName")
	String lastName;
	
	@Column(name = "MiddleName")
	String middleName;
	
	@Column(name = "Email")
	String email;
	
	@Column(name = "CellPhone")
	String cellPhone;
	
	@Column(name = "AlternatePhone")
	String alternatePhone;
	
	@Column(name = "Gender")
	String gender;
	
	@Column(name = "SSN")
	String ssn;
	
	@Column(name = "DOB")
	String dob;
	
	@OneToOne
	@JoinColumn(name="UserId")
	User user;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "person", cascade = CascadeType.MERGE)
    private Set<Contact> contact;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "person", cascade = CascadeType.MERGE)
    private Employee employee;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "person", cascade = CascadeType.MERGE)
    private Set<Address> address;

	@Override
	public String toString() {
		return this.getFirstName() +" " + this.getLastName();
	}
}
