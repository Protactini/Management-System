package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Set;

import javax.transaction.Transactional;

import com.example.w7pg2_backend.domain.*;
import com.example.w7pg2_backend.entity.ApplicationWorkFlow;
import com.example.w7pg2_backend.entity.PersonalDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.ApplicationWorkFlowDao;
import com.example.w7pg2_backend.dao.EmployeeDao;
import com.example.w7pg2_backend.domain.EmployeeDomain;
import com.example.w7pg2_backend.domain.EmployeeInfoDomain;
import com.example.w7pg2_backend.entity.ApplicationWorkFlow;
import com.example.w7pg2_backend.entity.Employee;
import com.example.w7pg2_backend.entity.Person;
import com.example.w7pg2_backend.entity.VisaStatus;

@Service("employeeService")
public class EmployeeService {
	@Autowired
	private EmployeeDao employeeDao;
	@Autowired
	private ApplicationWorkFlowDao applicationWorkFlowDao;
	@Autowired
	private UserService userService;
	
	@Transactional
	public List<EmployeeDomain> findAll() {
		List<Employee> employeees = employeeDao.findAll();
        List<EmployeeDomain> employeeDomains = new ArrayList<>();
        for (Employee e: employeees) {
        	employeeDomains.add(mapToDomain(e));
        }
        return employeeDomains;
	}
	
	@Transactional
	public EmployeeDomain findById(int id) {
		return mapToDomain(employeeDao.findById(id));
	}
	
	@Transactional
	public EmployeeDomain findByPersonId(int userId) {
        return mapToDomain(employeeDao.findByPersonId(userId));
    }
	
	@Transactional
	public int saveEmployee(EmployeeDomain employeeDomain) {
		Employee employee = new Employee();
		Person person = new Person();
		person.setId(employeeDomain.getPersonId());
		userService.pendingUserWithPersonId(employeeDomain.getPersonId());
		employee.setPerson(person);
		employee.setCar(employeeDomain.getCar());
		employee.setDl(employeeDomain.getDl());
		employee.setDlExpirationDate(employeeDomain.getDlExpirationDate());
		employee.setStartDate(employeeDomain.getStartDate());
		employee.setEndDate(employeeDomain.getEndDate());
		VisaStatus visa = new VisaStatus();
		visa.setId(employeeDomain.getVisaStatusId());
		employee.setVisaStatus(visa);
		int neweId =  employeeDao.save(employee);
		ApplicationWorkFlow applicationWorkFlow = new ApplicationWorkFlow();
		applicationWorkFlow.setStatus("Pending");
		applicationWorkFlow.setType("Onboarding");
		applicationWorkFlow.setEmployee(employee);
		applicationWorkFlowDao.save(applicationWorkFlow);
		return neweId;
	}
	
	@Transactional
	public EmployeeDomain updateEmployee(EmployeeDomain employeeDomain) {
		Employee employee = employeeDao.findById(employeeDomain.getId());
		ApplicationWorkFlow applicationWorkFlow = employee.getApplicationWorkFlow().iterator().next();
		applicationWorkFlow.setStatus("Pending");
		applicationWorkFlowDao.merge(applicationWorkFlow);
		userService.pendingUserWithPersonId(employeeDomain.getPersonId());
		employee.setCar(employeeDomain.getCar());
		employee.setDl(employeeDomain.getDl());
		employee.setDlExpirationDate(employeeDomain.getDlExpirationDate());
		employee.setAvartar(employeeDomain.getAvartar());
		employee.setStartDate(employeeDomain.getStartDate());
		employee.setEndDate(employeeDomain.getEndDate());	
		return mapToDomain(employeeDao.merge(employee));
    }
	
	@Transactional
	public EmployeeInfoDomain getAllInfoOfSingleEmployee(int employeeId) {
		EmployeeInfoDomain allInfo = new EmployeeInfoDomain();
		Employee employee = employeeDao.findById(employeeId);
		
		allInfo.setEmployee(mapToDomain(employee));
		allInfo.setPerson(PersonService.mapToDomain(employee.getPerson()));
		if (employee.getPerson()!=null && employee.getPerson().getAddress().size()>0) {
			allInfo.setAddress(AddressService.mapToDomain(employee.getPerson()
					.getAddress()
					.stream()
					.collect(Collectors.toList()).get(0)));
		}
		if (employee.getApplicationWorkFlow().size()>0) {
			allInfo.setApplicationWorkFlow(ApplicationWorkFlowService
					.mapToDomain(employee.getApplicationWorkFlow()
					.stream().collect(Collectors.toList()).get(0)));
		}
		allInfo.setVisaStatus(VisaStatusService.mapToDomain(employee.getVisaStatus()));
		allInfo.setContacts(employee.getPerson().getContact().stream()
				.map(c -> ContactService.mapToDomain(c)).collect(Collectors.toList()));
		return allInfo;
	}
	
	@Transactional
	public List<EmployeeInfoDomain> getAllInfoOfAllEmployee() {
		List<EmployeeInfoDomain> list = new ArrayList<>();
		for (Employee employee: employeeDao.findAll()) {
			EmployeeInfoDomain allInfo = new EmployeeInfoDomain();
			allInfo.setEmployee(mapToDomain(employee));
			allInfo.setPerson(PersonService.mapToDomain(employee.getPerson()));
			if (employee.getPerson()!=null && employee.getPerson().getAddress().size()>0) {
				allInfo.setAddress(AddressService.mapToDomain(employee.getPerson()
						.getAddress()
						.stream()
						.collect(Collectors.toList()).get(0)));
			} else {
				allInfo.setAddress(new AddressDomain());
			}
			if (employee.getApplicationWorkFlow().size()>0) {
				allInfo.setApplicationWorkFlow(ApplicationWorkFlowService
						.mapToDomain(employee.getApplicationWorkFlow()
						.stream().collect(Collectors.toList()).get(0)));
			}
			allInfo.setVisaStatus(VisaStatusService.mapToDomain(employee.getVisaStatus()));
			allInfo.setContacts(employee.getPerson().getContact().stream()
					.map(c -> ContactService.mapToDomain(c)).collect(Collectors.toList()));
			list.add(allInfo);
		}
		return list;
	}
	
	public static EmployeeDomain mapToDomain(Employee employee) {
		EmployeeDomain employeeDomain = new EmployeeDomain();
		employeeDomain.setId(employee.getId());
		employeeDomain.setId(employee.getId());
		employeeDomain.setPersonId(employee.getPerson().getId());
		employeeDomain.setCar(employee.getCar());
		employeeDomain.setDl(employee.getDl());
		employeeDomain.setDlExpirationDate(employee.getDlExpirationDate());
		employeeDomain.setAvartar(employee.getAvartar());
		employeeDomain.setStartDate(employee.getStartDate());
		employeeDomain.setEndDate(employee.getEndDate());
		if (employee.getVisaStatus() != null) {
			employeeDomain.setVisaStatusId(employee.getVisaStatus().getId());
		}
		return employeeDomain;
	}

	@Transactional
	public Employee findEmployeeById() {
		return employeeDao.getEmployeeById(1);
	}

	@Transactional
	public void updateEmployee(NameSectionDomain nameSectionDomain) {
		employeeDao.updateEmployee(1,nameSectionDomain);

	}

	@Transactional
	public void uploadPersonalDocument(UpLoadFileDomain upLoadFileDomain) {
		employeeDao.uploadPersonalDocument(upLoadFileDomain);
	}
	
	@Transactional
	public void uploadAvartar(int employeeId, String url) {
		Employee employee = employeeDao.findById(employeeId);
		employee.setAvartar(url);
		employeeDao.merge(employee);
	}

	@Transactional
	public ApplicationDomain getEmployeeVisaState(int id) {
		ApplicationWorkFlow applicationWorkFlow = employeeDao.getEmployeeVisaState(id);
		ApplicationDomain applicationDomain = ApplicationDomain.builder().stageNum(applicationWorkFlow.getStageNum())
				.comment(applicationWorkFlow.getComment()).id(applicationWorkFlow.getEmployee().getId())
				.endDate(applicationWorkFlow.getEmployee().getVisaStatus().getVisaEndDate())
				.build();
		List<ShowFileDomain> showFileDomains = new ArrayList<>();
		Employee employee = applicationWorkFlow.getEmployee();
		Set<PersonalDocument> personalDocument1 = employee.getPersonalDocument();
		for (PersonalDocument personalDocument : personalDocument1) {
			if (!personalDocument.getCreatedBy().equals(employee)) {
				showFileDomains.add(ShowFileDomain.builder().title(personalDocument.getTitle()).link(personalDocument.getPath()).build());
			}
		}
		applicationDomain.setFiles(showFileDomains);
		System.out.println(applicationDomain);
		return applicationDomain;
	}

	@Transactional
	public List<ApplicationDomain> getAllEmployeeVisaState() {
		List<ApplicationWorkFlow> applicationWorkFlowList = employeeDao.getAllEmployeeVisaState();
		List<ApplicationDomain> applicationDomainList = new ArrayList<>();

		for(ApplicationWorkFlow applicationWorkFlow: applicationWorkFlowList){
			ApplicationDomain applicationDomain = ApplicationDomain.builder().stageNum(applicationWorkFlow.getStageNum())
					.comment(applicationWorkFlow.getComment()).id(applicationWorkFlow.getEmployee().getId())
					.endDate(applicationWorkFlow.getEmployee().getVisaStatus().getVisaEndDate()).build();

			List<ShowFileDomain> showFileDomains = new ArrayList<>();
			Employee employee = applicationWorkFlow.getEmployee();
			Set<PersonalDocument> personalDocument1 = employee.getPersonalDocument();
			for (PersonalDocument personalDocument : personalDocument1) {
				if (personalDocument.getCreatedBy().equals(employee)) {
					showFileDomains.add(ShowFileDomain.builder().title(personalDocument.getTitle()).link(personalDocument.getPath()).build());
				}
			}
			applicationDomain.setFiles(showFileDomains);

			applicationDomainList.add(applicationDomain);
		}

		return applicationDomainList;
	}

	@Transactional
	public void updateEmployeeVisaState(VisaUpdateDomain visaUpdateDomain) {
		employeeDao.updateEmployeeVisaState(visaUpdateDomain);
	}

	@Transactional
	public List<ShowFileDomain> getFileInforById(int id) {
		Employee employee = employeeDao.getEmployeeById(id);
		List<ShowFileDomain> showFileDomains = new ArrayList<>();

		for(PersonalDocument personalDocument: employee.getPersonalDocument()){
		    ShowFileDomain showFileDomain =	ShowFileDomain.builder().title(personalDocument.getTitle()).link(personalDocument.getPath()).build();
			showFileDomains.add(showFileDomain);
		}

		return showFileDomains;
	}
}
