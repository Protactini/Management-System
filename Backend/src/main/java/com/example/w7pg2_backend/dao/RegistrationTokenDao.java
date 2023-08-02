package com.example.w7pg2_backend.dao;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.example.w7pg2_backend.domain.RegistrationTokenDomain;
import com.example.w7pg2_backend.entity.RegistrationToken;

@Repository("registrationTokenDao")
public class RegistrationTokenDao extends AbstractHibernateDao<RegistrationToken>{
	private static final String GET_WITH_TOKEN = "FROM RegistrationToken WHERE token=:token";
	
	public RegistrationTokenDao() {
		setClazz(RegistrationToken.class);
	}
	
	public RegistrationTokenDomain findByToken(String token) {
		Query query = getCurrentSession().createQuery(GET_WITH_TOKEN);
		query.setParameter("token", token);
		RegistrationToken regToken = (RegistrationToken) query.getSingleResult();
		if (regToken == null) {
			return null;
		} else {
			RegistrationTokenDomain regTokenDomain = new RegistrationTokenDomain();
			regTokenDomain.setId(regToken.getId());
			regTokenDomain.setToken(regToken.getToken());
			regTokenDomain.setEmail(regToken.getEmail());
			regTokenDomain.setValidDuration(regToken.getValidDuration());
			regTokenDomain.setCreatedBy(/*regToken.getCreatedBy().getId()*/1);
			return regTokenDomain;
		}
	}
	
	public void generateToken(RegistrationToken token) {
		getCurrentSession().save(token);
	}
}
