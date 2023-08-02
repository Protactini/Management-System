package com.example.w7pg2_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.domain.EmployeeDomain;
import com.example.w7pg2_backend.service.EmployeeService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class employeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employee")
    public List<EmployeeDomain> getEmployees() {
        return employeeService.findAll();
    }

    @GetMapping("/employee/{id}")
    public EmployeeDomain getEmployeeById(@PathVariable("id") int id) {
        return employeeService.findById(id);
    }

    @GetMapping("/employee/{uid}")
    public EmployeeDomain getEmployeeByPersonId(@PathVariable("uid") int uid) {
        return employeeService.findByPersonId(uid);
    }

    @PostMapping("/employee")
    public String saveEmployee(@RequestBody EmployeeDomain employee) {
        try {
        	employeeService.saveEmployee(employee);
        	return "Upload contact successfully!";
        } catch (Exception e) {
        	return "Error uploading contact!";
        }
    }

    @PutMapping("/employee")
    public EmployeeDomain updateEmployee(@RequestBody EmployeeDomain employee) {
        return employeeService.updateEmployee(employee);
    }
}
