package com.example.w7pg2_auth.entity;

import java.io.Serializable;
import java.util.Set;

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
@Table(name="Address")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Address implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "AddressLine1")
	String addressLine1;
	
	@Column(name = "AddressLine2")
	String addressLine2;
	
	@Column(name = "City")
	String city;
	
	@Column(name = "Zipcode")
	String zipCode;
	
	@Column(name = "StateName")
	String stateName;
	
	@ManyToOne
	@JoinColumn(name="PersonId")
	Person person;
}
