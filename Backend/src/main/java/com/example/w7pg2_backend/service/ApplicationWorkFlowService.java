package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.ApplicationWorkFlowDao;
import com.example.w7pg2_backend.domain.ApplicationWorkFlowDomain;
import com.example.w7pg2_backend.entity.ApplicationWorkFlow;
import com.example.w7pg2_backend.entity.Employee;

@Service("applicationWorkFlowService")
public class ApplicationWorkFlowService {
	@Autowired
	private ApplicationWorkFlowDao applicationWorkFlowDao;
	
	@Transactional
	public List<ApplicationWorkFlowDomain> findAll() {
        List<ApplicationWorkFlow> applicationWorkFlowes = applicationWorkFlowDao.findAll();
        List<ApplicationWorkFlowDomain> applicationWorkFlowDomains = new ArrayList<>();
        for (ApplicationWorkFlow a: applicationWorkFlowes) {
        	applicationWorkFlowDomains.add(mapToDomain(a));
        }
        return applicationWorkFlowDomains;
    }
	
	@Transactional
	public ApplicationWorkFlowDomain findById(int id) {
		return mapToDomain(applicationWorkFlowDao.findById(id));
	}
	
	@Transactional
	public int uploadApplicationWorkFlow(ApplicationWorkFlowDomain applicationWorkFlowDomain) {
		ApplicationWorkFlow applicationWorkFlow = new ApplicationWorkFlow();
		applicationWorkFlow.setComment(applicationWorkFlowDomain.getComment());
		applicationWorkFlow.setStatus(applicationWorkFlowDomain.getStatus());
		applicationWorkFlow.setType(applicationWorkFlowDomain.getType());
		Employee e = new Employee();
		e.setId(applicationWorkFlowDomain.getEmployeeId());
		applicationWorkFlow.setEmployee(e);
		return applicationWorkFlowDao.save(applicationWorkFlow);
	}
	
	@Transactional
	public ApplicationWorkFlowDomain updateApplicationWorkFlow(ApplicationWorkFlowDomain applicationWorkFlowDomain) {
		ApplicationWorkFlow applicationWorkFlow = applicationWorkFlowDao.findById(applicationWorkFlowDomain.getId());
		applicationWorkFlow.setComment(applicationWorkFlowDomain.getComment());
		applicationWorkFlow.setStatus(applicationWorkFlowDomain.getStatus());
		applicationWorkFlow.setType(applicationWorkFlowDomain.getType());
		Employee e = new Employee();
		e.setId(applicationWorkFlowDomain.getEmployeeId());
		applicationWorkFlow.setEmployee(e);
		return mapToDomain(applicationWorkFlowDao.merge(applicationWorkFlow));
    }
	
	@Transactional
	public String getEmail(int applicationId) {
		ApplicationWorkFlow applicationWorkFlow = applicationWorkFlowDao.findById(applicationId);
		return applicationWorkFlow.getEmployee().getPerson().getUser().getEmail();
    }
	
	public static ApplicationWorkFlowDomain mapToDomain(ApplicationWorkFlow applicationWorkFlow) {
		ApplicationWorkFlowDomain applicationWorkFlowDomain = new ApplicationWorkFlowDomain();
		applicationWorkFlowDomain.setId(applicationWorkFlow.getId());
		applicationWorkFlowDomain.setComment(applicationWorkFlow.getComment());
		applicationWorkFlowDomain.setType(applicationWorkFlow.getType());
		applicationWorkFlowDomain.setStatus(applicationWorkFlow.getStatus());
		applicationWorkFlowDomain.setEmployeeId(applicationWorkFlow.getEmployee().getId());
		return applicationWorkFlowDomain;
	}
}
