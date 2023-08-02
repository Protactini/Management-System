package com.example.w7pg2_backend.dao;

import org.springframework.stereotype.Repository;

import com.example.w7pg2_backend.entity.ApplicationWorkFlow;

@Repository("applicationWorkFlowDao")
public class ApplicationWorkFlowDao extends AbstractHibernateDao<ApplicationWorkFlow> {
	
	public ApplicationWorkFlowDao() {
		setClazz(ApplicationWorkFlow.class);
	}
	
}
