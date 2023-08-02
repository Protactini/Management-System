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
@Table(name="Contact")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Contact implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "Relationship")
	String relationship;
	
//	@Column(name = "title")
//	String title;
	
	@Column(name = "isReferrence")
	boolean isReference;
	
	@Column(name = "isEmergency")
	boolean isEmergency;
	
	@Column(name = "isLandlord")
	boolean isLandlord;
	
	@Column(name = "name")
	String name;
	
	@Column(name = "phone")
	String phone;
	
	@Column(name = "address")
	String address;
	
	@Column(name = "email")
	String email;
	
	@ManyToOne
	@JoinColumn(name="personId")
	Person person;
}
