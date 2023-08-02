package com.example.w7pg2_backend.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.example.w7pg2_backend.entity.Contact;

@Repository("contactDao")
public class ContactDao extends AbstractHibernateDao<Contact>{
	
	public ContactDao() {
		setClazz(Contact.class);
	}
	
	public Contact findByPersonId(int id) {
		Query query = getCurrentSession().createQuery("FROM Contact WHERE person.id=:id");
		query.setParameter("id", id);
		return (Contact) query.getSingleResult();
	}
	
	public List<Contact> findAllByPersonId(int id) {
		Query query = getCurrentSession().createQuery("FROM Contact WHERE person.id=:id");
		query.setParameter("id", id);
		return query.list();
	}
	
	public void deleteByPersonId(int id) {
		for (Contact c: findAllByPersonId(id)) {
			delete(c);
		}
	}
}
