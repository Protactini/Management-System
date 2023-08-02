package com.example.w7pg2_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.w7pg2_backend.domain.AddressDomain;
import com.example.w7pg2_backend.service.AddressService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class addressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/address")
    public List<AddressDomain> getAddressed() {
        return addressService.findAll();
    }

    @GetMapping("/address/{id}")
    public AddressDomain getAddressById(@PathVariable("id") int id) {
        return addressService.findById(id);
    }

    @GetMapping("/address/{uid}")
    public AddressDomain getAddressByPersonId(@PathVariable("uid") int uid) {
        return addressService.findByPersonId(uid);
    }

    @PostMapping("/address")
    public String saveAddress(@RequestBody AddressDomain address) {
        try {
        	addressService.uploadAddress(address);
        	return "Upload address successfully";
        } catch (Exception e) {
        	return "Error uploading address!";
        }
    }

    @PutMapping("/address")
    public AddressDomain updateAddress(@RequestBody AddressDomain address) {
    return addressService.updateAddress(address);
    }
}
