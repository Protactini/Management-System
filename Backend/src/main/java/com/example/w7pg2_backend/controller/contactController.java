package com.example.w7pg2_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.domain.ContactDomain;
import com.example.w7pg2_backend.service.ContactService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class contactController {
    @Autowired
    private ContactService contactService;

    @GetMapping("/contact")
    public List<ContactDomain> getContacts() {
        return contactService.findAll();
    }

    @GetMapping("/contact/{id}")
    public ContactDomain getContactById(@PathVariable("id") int id) {
        return contactService.findById(id);
    }

    @GetMapping("/contact/{uid}")
    public ContactDomain getContactByPersonId(@PathVariable("uid") int uid) {
        return contactService.findById(uid);
    }

    @PostMapping("/contact")
    public String saveContact(@RequestBody ContactDomain contact) {
    	try {
    		contactService.saveContact(contact);
        	return "Upload contact successfully";
        } catch (Exception e) {
        	return "Error uploading contact!";
        }
    }

    @PutMapping("/contact")
    public ContactDomain updateContact(@RequestBody ContactDomain contact) {
        return contactService.updateContact(contact);
    }
}
