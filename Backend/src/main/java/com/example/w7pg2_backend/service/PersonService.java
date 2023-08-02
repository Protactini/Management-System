package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.PersonDao;
import com.example.w7pg2_backend.domain.PersonDomain;
import com.example.w7pg2_backend.entity.Person;
import com.example.w7pg2_backend.entity.User;

@Service("personService")
public class PersonService {
	@Autowired
	private PersonDao personDao;
	
	@Transactional
	public List<PersonDomain> findAll() {
		List<Person> persons = personDao.findAll();
        List<PersonDomain> personDomains = new ArrayList<>();
        for (Person p: persons) {
        	personDomains.add(mapToDomain(p));
        }
        return personDomains;
    }
	
	@Transactional
	public PersonDomain findById(int id) {
		return mapToDomain(personDao.findById(id));
	}
	
	@Transactional
	public int savePerson(PersonDomain personDomain) {
		Person person = new Person();
		person.setFirstName(personDomain.getFirstName());
		person.setLastName(personDomain.getLastName());
		person.setMiddleName(personDomain.getMiddleName());
		person.setCellPhone(personDomain.getCellPhone());
		person.setAlternatePhone(personDomain.getAlternatePhone());
		person.setGender(personDomain.getGender());
		person.setSsn(personDomain.getSsn());
		person.setDob(personDomain.getDob());
		person.setEmail(personDomain.getEmail());
		User user = new User();
		user.setId(personDomain.getUserId());
		person.setUser(user);
		return personDao.save(person);
	}
	
	@Transactional
	public PersonDomain updatePerson(PersonDomain personDomain) {
		Person person = personDao.findById(personDomain.getId());
		person.setFirstName(personDomain.getFirstName());
		person.setLastName(personDomain.getLastName());
		person.setMiddleName(personDomain.getMiddleName());
		person.setCellPhone(personDomain.getCellPhone());
		person.setAlternatePhone(personDomain.getAlternatePhone());
		person.setGender(personDomain.getGender());
		person.setSsn(personDomain.getSsn());
		person.setDob(personDomain.getDob());
		User user = new User();
		user.setId(personDomain.getUserId());
		person.setUser(user);
        return mapToDomain(personDao.merge(person));
    }
	
	public static PersonDomain mapToDomain(Person person) {
		PersonDomain personDomain = new PersonDomain();
		personDomain.setId(person.getId());
		personDomain.setFirstName(person.getFirstName());
		personDomain.setLastName(person.getLastName());
		personDomain.setMiddleName(person.getMiddleName());
		personDomain.setCellPhone(person.getCellPhone());
		personDomain.setAlternatePhone(person.getAlternatePhone());
		personDomain.setGender(person.getGender());
		personDomain.setSsn(person.getSsn());
		personDomain.setDob(person.getDob());
		personDomain.setUserId(person.getUser().getId());
		return personDomain;
	}
}
