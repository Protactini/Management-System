package com.example.w7pg2_backend.dao;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.example.w7pg2_backend.entity.Contact;
import com.example.w7pg2_backend.entity.VisaStatus;


@Repository("visaStatusDao")
public class VisaStatusDao extends AbstractHibernateDao<VisaStatus>{
	
	public VisaStatusDao() {
		setClazz(VisaStatus.class);
	}
	
	public VisaStatus findByPersonId(int id) {
		Query query = getCurrentSession().createQuery("FROM VisaStatus WHERE person.id=:id");
		query.setParameter("id", id);
		return (VisaStatus) query.getSingleResult();
	}
	
}
