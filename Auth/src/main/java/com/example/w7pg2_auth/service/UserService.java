package com.example.w7pg2_auth.service;

import com.example.w7pg2_auth.dao.UserDao;
import com.example.w7pg2_auth.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service("userService")
public class UserService {

    @Autowired
    private UserDao userDao;

    @Transactional
    public User checkLogin(String email, String password) {
        User user = userDao.findByUserName(email);
        if (user.getPassword().equals(password)) {
            return user;
        } else {
            return null;
        }
    }

//    @Transactional
//    public User create(User user) { return userDao.create(user); }

    @Transactional
    public User merge(User user) {
        return userDao.merge(user);
    }
}