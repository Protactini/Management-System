package com.example.w7pg2_backend.dao;

import org.springframework.stereotype.Repository;
import com.example.w7pg2_backend.entity.Person;

@Repository("personDao")
public class PersonDao extends AbstractHibernateDao<Person>{
	
	public PersonDao() {
		setClazz(Person.class);
	}
	
}
