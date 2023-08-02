package com.example.w7pg2_backend.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.ApplicationWorkFlowDao;
import com.example.w7pg2_backend.dao.PersonDao;
import com.example.w7pg2_backend.dao.UserDao;
import com.example.w7pg2_backend.domain.UserDomain;
import com.example.w7pg2_backend.entity.Role;
import com.example.w7pg2_backend.entity.User;

@Service("userService")
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ApplicationWorkFlowDao applicationWorkFlowDao;
	@Autowired
	private PersonDao personDao;
	
	@Transactional
	public User findById(int id) {
		return userDao.findById(id);
	}
	
	@Transactional
	public void uploadUser(UserDomain newUserDomain) {
		User newUser = new User();
		newUser.setUserName(newUserDomain.getUserName());
		newUser.setPassword(newUserDomain.getPassword());
		newUser.setEmail(newUserDomain.getEmail());
		newUser.setCreateDate(newUserDomain.getCreateDate());
		Role role = new Role();
		role.setId(3);
		newUser.setRole(role);
		userDao.save(newUser);
	}
	
	@Transactional
	public void approveUserWithApplicationId(int id) {
		User user = applicationWorkFlowDao.findById(id).getEmployee().getPerson().getUser();
		Role role = new Role();
		role.setId(2);
		user.setRole(role);
		userDao.merge(user);
	}
	
	@Transactional
	public void rejectUserWithApplicationId(int id) {
		User user = applicationWorkFlowDao.findById(id).getEmployee().getPerson().getUser();
		Role role = new Role();
		role.setId(3);
		user.setRole(role);
		userDao.merge(user);
	}
	
	@Transactional
	public void pendingUserWithPersonId(int id) {
		User user = personDao.findById(id).getUser();
		Role role = new Role();
		role.setId(4);
		user.setRole(role);
		userDao.merge(user);
	}
}
