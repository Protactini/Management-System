package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.ContactDao;
import com.example.w7pg2_backend.domain.ContactDomain;
import com.example.w7pg2_backend.entity.Contact;
import com.example.w7pg2_backend.entity.Person;

@Service("contactService")
public class ContactService {
	@Autowired
	private ContactDao contactDao;
	
	@Transactional
	public List<ContactDomain> findAll() {
		List<Contact> contacts = contactDao.findAll();
        List<ContactDomain> contactDomains = new ArrayList<>();
        for (Contact c: contacts) {
        	contactDomains.add(mapToDomain(c));
        }
        return contactDomains;
	}
	
	@Transactional
	public ContactDomain findById(int id) {
		return mapToDomain(contactDao.findById(id));
	}
	
	@Transactional
	public ContactDomain findByPersonId(int userId) {
        return mapToDomain(contactDao.findByPersonId(userId));
    }
	
	@Transactional
	public void saveContact(ContactDomain contactDomain) {
		Contact contact = new Contact();
		Person person = new Person();
		person.setId(contactDomain.getPersonId());
		contact.setPerson(person);
		contact.setName(contactDomain.getName());
		contact.setPhone(contactDomain.getPhone());
		contact.setAddress(contactDomain.getAddress());
		contact.setEmail(contactDomain.getEmail());
		contact.setRelationship(contactDomain.getRelationship());
		contact.setReference(contactDomain.isReference());
		contact.setEmergency(contactDomain.isEmergency());
		contactDao.save(contact);
	}
	
	@Transactional
	public void saveMultipleContact(List<ContactDomain> contactDomainList) {
		contactDao.deleteByPersonId(contactDomainList.get(0).getPersonId());
		for (ContactDomain cd: contactDomainList) {
			saveContact(cd);
		}
	}
	
	@Transactional
	public ContactDomain updateContact(ContactDomain contactDomain) {
		Contact contact = contactDao.findById(contactDomain.getId());
		Person person = new Person();
		person.setId(contactDomain.getPersonId());
		contact.setPerson(person);
		contact.setName(contactDomain.getName());
		contact.setPhone(contactDomain.getPhone());
		contact.setAddress(contactDomain.getAddress());
		contact.setEmail(contactDomain.getEmail());
		contact.setRelationship(contactDomain.getRelationship());
		contact.setReference(contactDomain.isReference());
		contact.setEmergency(contactDomain.isEmergency());
        return mapToDomain(contactDao.merge(contact));
    }
	
	public static ContactDomain mapToDomain(Contact contact) {
		ContactDomain contactDomain = new ContactDomain();
		contactDomain.setPersonId(contact.getPerson().getId());
		contactDomain.setId(contact.getId());
		contactDomain.setName(contact.getName());
		contactDomain.setPhone(contact.getPhone());
		contactDomain.setAddress(contact.getAddress());
		contactDomain.setEmail(contact.getEmail());
		contactDomain.setRelationship(contact.getRelationship());
		contactDomain.setReference(contact.isReference());
		contactDomain.setEmergency(contact.isEmergency());
		contactDomain.setLandlord(contact.isLandlord());
		return contactDomain;
	}
}
