package com.example.w7pg2_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.service.EmployeeService;
import com.example.w7pg2_backend.entity.*;
import com.example.w7pg2_backend.domain.*;

import java.io.File;
import java.util.List;

@RestController
@CrossOrigin()
public class MainController {

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/name",method = RequestMethod.GET)
    public NameSectionDomain sendRequiredEmployee() {
        Employee employee = employeeService.findEmployeeById();
        NameSectionDomain nameSectionDomain = NameSectionDomain.builder().firstName(employee.getPerson().getFirstName())
                .lastName(employee.getPerson().getLastName())
                .avatar(employee.getAvartar())
                .gender(employee.getPerson().getGender())
                .ssn(employee.getPerson().getSsn()).build();
    	return nameSectionDomain;
    }

    @RequestMapping(value = "/name",method = RequestMethod.POST)
    public void getUpdatedEmployee(@RequestBody NameSectionDomain nameSectionDomain) {
        System.out.println(nameSectionDomain);
        employeeService.updateEmployee(nameSectionDomain);

    }

    @RequestMapping(value = "/file",method = RequestMethod.POST)
    public void postUpdatedPersonalDocument(@RequestBody UpLoadFileDomain upLoadFileDomain) {
        System.out.println(upLoadFileDomain);
        employeeService.uploadPersonalDocument(upLoadFileDomain);
    }
    
    @RequestMapping(value = "/avartar",method = RequestMethod.POST)
    public void uploadAvartar(@RequestBody UpLoadFileDomain upLoadFileDomain) {
        employeeService.uploadAvartar(upLoadFileDomain.getId(), upLoadFileDomain.getLocation());
    }

    @RequestMapping(value = "/file",method = RequestMethod.GET)
    public List<ShowFileDomain> getEmployeeDocument(@RequestBody UserIdDomain userIdDomain) {
        System.out.println(userIdDomain);
        return employeeService.getFileInforById(userIdDomain.getId());
    }

    @RequestMapping(value = "/employeeVisa/{id}",method = RequestMethod.GET)
    public ApplicationDomain getEmployeeVisaState(@PathVariable int id) {
        System.out.println(id);
        return employeeService.getEmployeeVisaState(id);
    }

    @RequestMapping(value = "/allEmployeeVisa",method = RequestMethod.GET)
    public List<ApplicationDomain> getAllEmployeeVisaState() {
//        System.out.println(id);
        return employeeService.getAllEmployeeVisaState();
    }

    @RequestMapping(value = "/employeeVisa",method = RequestMethod.POST)
    public void postEmployeeVisaState(@RequestBody VisaUpdateDomain visaUpdateDomain) {
        System.out.println(visaUpdateDomain);
        employeeService.updateEmployeeVisaState(visaUpdateDomain);
    }


}
