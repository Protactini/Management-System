package com.example.w7pg2_backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.w7pg2_backend.constant.JwtConstant;
import com.example.w7pg2_backend.domain.AddressDomain;
import com.example.w7pg2_backend.domain.ContactDomain;
import com.example.w7pg2_backend.domain.EmployeeDomain;
import com.example.w7pg2_backend.domain.OnboardSection1Domain;
import com.example.w7pg2_backend.domain.OnboardSection2Domain;
import com.example.w7pg2_backend.domain.PersonDomain;
import com.example.w7pg2_backend.domain.RegistrationTokenDomain;
import com.example.w7pg2_backend.domain.UserDomain;
import com.example.w7pg2_backend.domain.VisaStatusDomain;
import com.example.w7pg2_backend.entity.Employee;
import com.example.w7pg2_backend.entity.RegistrationToken;
import com.example.w7pg2_backend.mail.JavaEmail;
import com.example.w7pg2_backend.security.util.CookieUtil;
import com.example.w7pg2_backend.security.util.JwtUtil;
import com.example.w7pg2_backend.service.AddressService;
import com.example.w7pg2_backend.service.ContactService;
import com.example.w7pg2_backend.service.EmployeeService;
import com.example.w7pg2_backend.service.PersonService;
import com.example.w7pg2_backend.service.RegistrationTokenService;
import com.example.w7pg2_backend.service.UserService;
import com.example.w7pg2_backend.service.VisaStatusService;

import io.jsonwebtoken.Claims;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class RegisterController {
	
	@Autowired
	RegistrationTokenService registrationTokenService;
	@Autowired
	UserService userService;
	@Autowired
	PersonService personService;
	@Autowired
	EmployeeService employeeService;
	@Autowired
	VisaStatusService visaStatusService;
	@Autowired
	AddressService addressService;
	@Autowired
	ContactService contactService;
	
	@GetMapping("/register/{token}")
    public RegistrationTokenDomain getToken(@PathVariable String token){
        return registrationTokenService.findByToken(token);
    }
	
	@PostMapping("/register")
    public String uploadToken(@RequestBody UserDomain newUser){
		try {
			userService.uploadUser(newUser);
			return "User registered successfully!";
		} catch (Exception e) {
			return "Error uploading user!";
		}
    }
	
	@PostMapping("/onboard/section1")
    public int uploadSection1(@RequestBody OnboardSection1Domain section1){
		try {
			AddressDomain address = section1.getAddress();
			PersonDomain person = section1.getPerson();
			int id = 0;
			if (person.getId() < 1) {
				id = personService.savePerson(section1.getPerson());			
			} else {
				id = section1.getPerson().getId();
				personService.updatePerson(section1.getPerson());
			}
			address.setPersonId(id);
			if (address.getId() < 1)
				addressService.uploadAddress(address);
			else
				addressService.updateAddress(address);
			return id;
			
		} catch (Exception e) {
			return 0;
		}
    }
	
	@PostMapping("/onboard/section2")
    public int uploadSection2(@RequestBody OnboardSection2Domain section2){
		try {
			EmployeeDomain employee = section2.getEmployee();
			VisaStatusDomain visa = section2.getVisaStatus();
			int id = 0;
			if (visa.getId() < 1) 
				id = visaStatusService.saveVisaStatus(visa);
			else {
				id = visa.getId();
				visaStatusService.updateVisaStatus(visa);
			}
			employee.setVisaStatusId(id);
			int eId = employee.getId();
			if (employee.getId() < 1)
				eId = employeeService.saveEmployee(employee);
			else
				employeeService.updateEmployee(employee);
			return eId;
		} catch (Exception e) {
			return 0;
		}
    }
	
	@PostMapping("/onboard/section3")
    public String uploadSection3(@RequestBody List<ContactDomain> section3){
		try {
			contactService.saveMultipleContact(section3);
			return "Section uploaded successfully!";
		} catch (Exception e) {
			return "Error uploading section!";
		}
    }
	
	@PostMapping("/hr/hire/generateToken/{email}")
    public String generateRegistrationToken(@PathVariable String email, HttpServletRequest req) {
		JavaEmail javaEmail = new JavaEmail();
		javaEmail.setMailServerProperties();
		String emailSubject = "Contact Form using Java JSP GMail";
		
		LocalDateTime date = LocalDateTime.now();
        date.plusMinutes(RegistrationToken.EXPIRATION);
        
        String tokenString = UUID.randomUUID().toString();
		RegistrationToken token = new RegistrationToken();
        StringBuilder body = new StringBuilder("Please register your account by clicking ");
        body.append("<a href=\"http://localhost:4200/register?token=");
        body.append(tokenString);
        body.append("\">here</a>\n");
        body.append("\nThis token expires on " + date.toString());
        
        try {
			javaEmail.createEmailMessage(emailSubject, body.toString(), email);
			javaEmail.sendEmail();
			token.setToken(tokenString);
			token.setEmail(email);
			token.setValidDuration(date.toString());
			
//			Employee creator = new Employee(); 
//			String cookie = CookieUtil.getValue(req, JwtConstant.JWT_COOKIE_NAME);
//	        Claims claims = JwtUtil.getClaimsFromJwt(cookie);
//	        if(claims == null)
//	            return null;
//	        creator.setId(/*(Integer) claims.get("id")*/1);
//			token.setCreatedBy(creator);
			registrationTokenService.generateToken(token);
		} catch (MessagingException e) {
			return "Error creating token!";
		}
        return "Token created!";
    }
	
}
