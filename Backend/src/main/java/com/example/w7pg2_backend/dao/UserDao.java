package com.example.w7pg2_backend.dao;

import org.springframework.stereotype.Repository;
import com.example.w7pg2_backend.entity.User;

@Repository("userDao")
public class UserDao extends AbstractHibernateDao<User>{
	
	public UserDao() {
		setClazz(User.class);
	}
	
}
