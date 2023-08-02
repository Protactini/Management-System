package com.example.w7pg2_backend.entity;

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
@Table(name="PersonalDocument")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PersonalDocument implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;

	@ManyToOne
	@JoinColumn(name="EmployeeId")
	Employee employee;
	
	@Column(name = "Path")
	String path;
	
	@Column(name = "Title")
	String title;
	
	@Column(name = "Comment")
	String comment;
	
	@Column(name = "CreatedDate")
	String createdDate;

	@ManyToOne
	@JoinColumn(name="CreatedBy")
	Employee createdBy;
}
