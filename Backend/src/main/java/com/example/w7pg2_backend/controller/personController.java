package com.example.w7pg2_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.domain.PersonDomain;
import com.example.w7pg2_backend.service.PersonService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class personController {
    @Autowired
    private PersonService personService;

    @GetMapping("/person")
    public List<PersonDomain> getPersons() {
        return personService.findAll();
    }

    @GetMapping("/person/{id}")
    public ResponseEntity getPersonById(@PathVariable("id") int id) {
        return new ResponseEntity(personService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/person")
    public String savePerson(@RequestBody PersonDomain person) {
        try {
        	personService.savePerson(person);
        	return "Upload person successfully";
        } catch (Exception e) {
        	return "Error uploading person!";
        }
    }

    @PutMapping("/person")
    public PersonDomain updatePersonalInfo(@RequestBody PersonDomain person) {
        return personService.updatePerson(person);
    }
}
