package com.example.w7pg2_backend.dao;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import com.example.w7pg2_backend.entity.Address;

@Repository("addressDao")
public class AddressDao extends AbstractHibernateDao<Address>{
	
	public AddressDao() {
		setClazz(Address.class);
	}
	
	public Address findByPersonId(int id) {
		Query query = getCurrentSession().createQuery("FROM Address WHERE person.id=:id");
		query.setParameter("id", id);
		return (Address) query.getSingleResult();
	}
	
}
