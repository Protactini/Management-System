package com.example.w7pg2_backend.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.RegistrationTokenDao;
import com.example.w7pg2_backend.domain.RegistrationTokenDomain;
import com.example.w7pg2_backend.entity.RegistrationToken;

@Service("registrationTokenService")
public class RegistrationTokenService {
	@Autowired
	private RegistrationTokenDao registrationTokenDao;
	
	@Transactional
	public RegistrationTokenDomain findByToken(String token) {
		return registrationTokenDao.findByToken(token);
	}
	
	@Transactional
	public void generateToken(RegistrationToken token) {
		registrationTokenDao.generateToken(token);
	}
}
