package com.example.w7pg2_backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.w7pg2_backend.domain.AddressDomain;
import com.example.w7pg2_backend.domain.ApplicationWorkFlowDomain;
import com.example.w7pg2_backend.domain.ContactDomain;
import com.example.w7pg2_backend.domain.EmployeeDomain;
import com.example.w7pg2_backend.domain.EmployeeInfoDomain;
import com.example.w7pg2_backend.domain.PersonDomain;
import com.example.w7pg2_backend.domain.VisaStatusDomain;
import com.example.w7pg2_backend.entity.User;
import com.example.w7pg2_backend.mail.JavaEmail;
import com.example.w7pg2_backend.service.AddressService;
import com.example.w7pg2_backend.service.ApplicationWorkFlowService;
import com.example.w7pg2_backend.service.EmployeeService;
import com.example.w7pg2_backend.service.PersonService;
import com.example.w7pg2_backend.service.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class HireController {
	@Autowired
	EmployeeService employeeService;
	@Autowired
	ApplicationWorkFlowService applicationWorkFlowService;
	@Autowired
	UserService userService;
	
	@GetMapping("/hr/allinfo")
    public List<EmployeeInfoDomain> getAllInfo(){
        return employeeService.getAllInfoOfAllEmployee();
    }
	
	@GetMapping("/hr/singleinfo/{userId}")
    public EmployeeInfoDomain getSingleInfo(@PathVariable int userId){
		User user = userService.findById(userId);
		List<ContactDomain> contactList = new ArrayList<>();
		contactList.add(new ContactDomain());
		if (user.getPerson() == null || user.getPerson().getEmployee() == null) {
			EmployeeInfoDomain info = new EmployeeInfoDomain();
			
			info.setEmployee(new EmployeeDomain());
			if (user.getPerson() != null) {
				info.setPerson(PersonService.mapToDomain(user.getPerson()));
				info.setAddress(AddressService.mapToDomain(user.getPerson().getAddress().iterator().next()));
			} else {
				info.setPerson(new PersonDomain());
				info.setAddress(new AddressDomain());
			}
			info.setVisaStatus(new VisaStatusDomain());
			info.setContacts(contactList);
			return info;
		}
		EmployeeInfoDomain info = employeeService.getAllInfoOfSingleEmployee(user.getPerson().getEmployee().getId());
		if (info.getContacts()== null || info.getContacts().size()==0) {
			info.setContacts(contactList);
		}
        return info;
    }
	
	@PostMapping("/hr/hire/approve")
    public String approve(@RequestBody ApplicationWorkFlowDomain applicationWorkFlowDomain){
		try {
			applicationWorkFlowService.updateApplicationWorkFlow(applicationWorkFlowDomain);
			//Update user role
			userService.approveUserWithApplicationId(applicationWorkFlowDomain.getId());
			String emailRecipient = applicationWorkFlowService.getEmail(applicationWorkFlowDomain.getId());
			//Send email
			JavaEmail javaEmail = new JavaEmail();
			javaEmail.setMailServerProperties();
			String emailSubject = "Application approved";
			String body = "Congratulation! Your " + applicationWorkFlowDomain.getType() + " application has been approved!";
			javaEmail.createEmailMessage(emailSubject, body, emailRecipient);
			javaEmail.sendEmail();
			
			return "Application approved!";
		} catch (Exception e) {
			return "Failed to approve application, please try again!"; 
		}
    }
	
	@PostMapping("/hr/hire/reject")
    public String reject(@RequestBody ApplicationWorkFlowDomain applicationWorkFlowDomain){
		try {
			applicationWorkFlowService.updateApplicationWorkFlow(applicationWorkFlowDomain);
			userService.rejectUserWithApplicationId(applicationWorkFlowDomain.getId());
			//Send email
			JavaEmail javaEmail = new JavaEmail();
			javaEmail.setMailServerProperties();
			String emailRecipient = applicationWorkFlowService.getEmail(applicationWorkFlowDomain.getId());
			String emailSubject = "Application rejected";
			String body = "Please log in again to fix your application!\nComment:\n" + applicationWorkFlowDomain.getComment();
			javaEmail.createEmailMessage(emailSubject, body, emailRecipient);
			javaEmail.sendEmail();
			
			return "Application rejected!";
		} catch (Exception e) {
			return "Failed to reject application, please try again!"; 
		}
    }
}
