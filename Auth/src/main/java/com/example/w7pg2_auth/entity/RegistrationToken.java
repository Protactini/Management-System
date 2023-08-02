package com.example.w7pg2_auth.entity;

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
	@Column(name = "id")
	int id;
	
	@Column(name = "token")
	String token;
	
	@Column(name = "validDuration")
	String validDuration;
	
	@Column(name = "email")
	String email;
	
	@OneToOne
	@JoinColumn(name="createdBy")
	Employee createdBy;
}
