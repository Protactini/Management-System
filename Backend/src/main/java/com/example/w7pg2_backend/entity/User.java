package com.example.w7pg2_backend.entity;

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
@Table(name="User")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class User implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	int id;
	
	@Column(name = "UserName")
	String userName;
	
	@Column(name = "Email")
	String email;
	
	@Column(name = "Password")
	String password;
	
	@Column(name = "CreateDate")
	String createDate;
	
	@ManyToOne
	@JoinColumn(name="RoleId")
	Role role;
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.MERGE)
    private Person person;
}
