package com.example.w7pg2_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.domain.VisaStatusDomain;
import com.example.w7pg2_backend.service.VisaStatusService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class visaStatusController {
    @Autowired
    private VisaStatusService visaStatusService;

    @GetMapping("/visastatus")
    public List<VisaStatusDomain> getVisaStatuses() {
        return visaStatusService.findAll();
    }

    @GetMapping("/visastatus/{id}")
    public VisaStatusDomain getVisaStatusById(@PathVariable("id") int id) {
        return visaStatusService.findById(id);
    }

    @GetMapping("/visastatus/{uid}")
    public VisaStatusDomain getVisaStatusByPersonId(@PathVariable("uid") int uid) {
        return visaStatusService.findByPersonId(uid);
    }

    @PostMapping("/visastatus")
    public String saveVisaStatus(@RequestBody VisaStatusDomain visaStatus) { 
        try {
        	visaStatusService.saveVisaStatus(visaStatus);
        	return "Upload visa successfully";
        } catch (Exception e) {
        	return "Error uploading visa!";
        }
    }

    @PutMapping("/visastatus")
    public VisaStatusDomain updateVisaStatus(@RequestBody VisaStatusDomain visaStatus) {
        return visaStatusService.updateVisaStatus(visaStatus);
    }
}
