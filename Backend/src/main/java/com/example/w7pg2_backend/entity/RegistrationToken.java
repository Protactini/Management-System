package com.example.w7pg2_backend.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.*;

@Entity
@Table(name="RegistrationToken")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RegistrationToken implements Serializable {
	public static final int EXPIRATION = 60 * 3;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "Token")
	String token;
	
	@Column(name = "ValidDuration")
	String validDuration;
	
	@Column(name = "Email")
	String email;
	
	@OneToOne
	@JoinColumn(name="CreatedBy")
	Employee createdBy;
}
