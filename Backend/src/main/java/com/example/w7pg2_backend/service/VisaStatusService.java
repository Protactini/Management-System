package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.VisaStatusDao;
import com.example.w7pg2_backend.domain.VisaStatusDomain;
import com.example.w7pg2_backend.entity.Employee;
import com.example.w7pg2_backend.entity.VisaStatus;

@Service("visaStatusService")
public class VisaStatusService {
	@Autowired
	private VisaStatusDao visaStatusDao;
	
	@Transactional
	public VisaStatusDomain findById(int id) {
		return mapToDomain(visaStatusDao.findById(id));
	}
	
	@Transactional
	public List<VisaStatusDomain> findAll() {
		List<VisaStatus> visaStatuses = visaStatusDao.findAll();
        List<VisaStatusDomain> visaStatusDomains = new ArrayList<>();
        for (VisaStatus a: visaStatuses) {
        	visaStatusDomains.add(mapToDomain(a));
        }
        return visaStatusDomains;
	}
	
	@Transactional
	public VisaStatusDomain findByPersonId(int userId) {
        return mapToDomain(visaStatusDao.findByPersonId(userId));
    }
	
	@Transactional
	public int saveVisaStatus(VisaStatusDomain visaStatusDomain) {
		VisaStatus visaStatus = new VisaStatus();
		visaStatus.setVisaType(visaStatusDomain.getVisaType());
		visaStatus.setVisaStartDate(visaStatusDomain.getVisaStartDate());
		visaStatus.setVisaEndDate(visaStatusDomain.getVisaEndDate());
		return visaStatusDao.save(visaStatus);
	}
	
	@Transactional
	public VisaStatusDomain updateVisaStatus(VisaStatusDomain visaStatusDomain) {
		VisaStatus visaStatus = visaStatusDao.findById(visaStatusDomain.getId());
		visaStatus.setVisaType(visaStatusDomain.getVisaType());
		visaStatus.setVisaStartDate(visaStatusDomain.getVisaStartDate());
		visaStatus.setVisaEndDate(visaStatusDomain.getVisaEndDate());
        return mapToDomain(visaStatusDao.merge(visaStatus));
    }
	
	public static VisaStatusDomain mapToDomain(VisaStatus visaStatus) {
		VisaStatusDomain visaStatusDomain = new VisaStatusDomain();
		if (visaStatus != null) {
			visaStatusDomain.setId(visaStatus.getId());
			visaStatusDomain.setVisaType(visaStatus.getVisaType());
			visaStatusDomain.setVisaStartDate(visaStatus.getVisaStartDate());
			visaStatusDomain.setVisaEndDate(visaStatus.getVisaEndDate());
		}
		return visaStatusDomain;
	}
}
