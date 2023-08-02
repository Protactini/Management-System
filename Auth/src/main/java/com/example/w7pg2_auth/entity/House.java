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
@Table(name="House")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class House implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;
	
	@ManyToOne
	@JoinColumn(name="contactId")
	Contact contact;
	
	@Column(name = "address")
	String address;
	
	@Column(name = "numberOfPerson")
	int numberOfPerson;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "house", cascade = CascadeType.MERGE)
    private Set<Employee> employee;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "house", cascade = CascadeType.MERGE)
    private Set<Facility> facility;
}
