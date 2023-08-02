package com.example.w7pg2_backend.dao;

import com.example.w7pg2_backend.domain.NameSectionDomain;
import com.example.w7pg2_backend.domain.UpLoadFileDomain;
import com.example.w7pg2_backend.domain.VisaUpdateDomain;
import com.example.w7pg2_backend.entity.*;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository("employeeDao")
public class EmployeeDao extends AbstractHibernateDao<Employee>{
	
	public EmployeeDao() {
		setClazz(Employee.class);
	}


	public Employee getEmployeeById(int num){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Employee p JOIN FETCH p.person WHERE p.id = :t");
		query.setParameter("t",num);

		Employee employee = (Employee) query.getSingleResult();
		employee.getPerson();
		return employee;
	}

	public ApplicationWorkFlow getEmployeeVisaState(int num){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Employee p JOIN FETCH p.personalDocument WHERE p.id = :t");
		query.setParameter("t",num);
		Employee employee = (Employee) query.getSingleResult();

//		query = session.createQuery("FROM ApplicationWorkFlow p WHERE p.employee = :t");
//		query.setParameter("t",employee);

//		employee.getPerson().getContact().size();
//		employee.getPerson().getAddress().size();
		ApplicationWorkFlow applicationWorkFlow =  employee.getApplicationWorkFlow().iterator().next();

		return applicationWorkFlow;
	}



	public void updateEmployee(int num, NameSectionDomain nameSectionDomain){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Employee p WHERE p.id = :t");
		query.setParameter("t",num);
		Employee employee = (Employee) query.getSingleResult();
		employee.getPerson().setFirstName(nameSectionDomain.getFirstName());
		employee.getPerson().setLastName(nameSectionDomain.getLastName());
		employee.setAvartar(nameSectionDomain.getAvatar());
		employee.getPerson().setGender(nameSectionDomain.getGender());
		employee.getPerson().setSsn(nameSectionDomain.getSsn());
		session.update(employee);

	}

	public void uploadPersonalDocument(UpLoadFileDomain upLoadFileDomain){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Employee p WHERE p.id = :t");
		query.setParameter("t",upLoadFileDomain.getId());
		Employee employee = (Employee) query.getSingleResult();
		query.setParameter("t",upLoadFileDomain.getUploadBy());
		Employee uploader = (Employee) query.getSingleResult();
		PersonalDocument personalDocument =  PersonalDocument.builder().employee(employee)
				.path(upLoadFileDomain.getLocation())
				.title(upLoadFileDomain.getTitle())
				.createdBy(uploader).build();
		session.merge(personalDocument);
	}

	public void updateEmployeeVisaState(VisaUpdateDomain visaUpdateDomain){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Employee p WHERE p.id = :t");
		query.setParameter("t",visaUpdateDomain.getId());
		Employee employee = (Employee) query.getSingleResult();
		ApplicationWorkFlow applicationWorkFlow =  employee.getApplicationWorkFlow().iterator().next();
		int temp = applicationWorkFlow.getStageNum();
		applicationWorkFlow.setStageNum(temp + visaUpdateDomain.getNum());
		applicationWorkFlow.setComment(visaUpdateDomain.getComment());
		session.update(employee);
	}

	public List<ApplicationWorkFlow> getAllEmployeeVisaState(){
		Session session = getCurrentSession();
		Query query = session.createQuery("FROM Role p WHERE p.id = 2");
		Role role = (Role) query.getSingleResult();

		query = session.createQuery("FROM Employee p WHERE p.person.user.role = :t");
		query.setParameter("t",role);
		List<Employee> employees = query.getResultList();
		List<ApplicationWorkFlow> applicationWorkFlowList = employees.stream().map(p -> p.getApplicationWorkFlow().iterator().next()).collect(Collectors.toList());
		return applicationWorkFlowList;
	}
	
	public Employee findByPersonId(int id) {
		Query query = getCurrentSession().createQuery("FROM Employee WHERE person.id=:id");
		query.setParameter("id", id);
		return (Employee) query.getSingleResult();
	}
	
}
