package com.example.w7pg2_auth.dao;

import com.example.w7pg2_auth.entity.User;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository("userDao")
public class UserDao extends AbstractHibernateDao<User> {

    public UserDao () {
        setClazz(User.class);
    }
    
    public User findByUserName(String username) {
    	Query query = getCurrentSession().createQuery("FROM User WHERE userName=:username");
		query.setParameter("username", username);
		User user = (User) query.getSingleResult();
        return user;
    }
}
