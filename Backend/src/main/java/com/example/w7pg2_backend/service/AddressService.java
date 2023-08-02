package com.example.w7pg2_backend.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.w7pg2_backend.dao.AddressDao;
import com.example.w7pg2_backend.domain.AddressDomain;
import com.example.w7pg2_backend.entity.Address;
import com.example.w7pg2_backend.entity.Person;

@Service("addressService")
public class AddressService {
	@Autowired
	private AddressDao addressDao;
	
	@Transactional
	public List<AddressDomain> findAll() {
        List<Address> addresses = addressDao.findAll();
        List<AddressDomain> addressDomains = new ArrayList<>();
        for (Address a: addresses) {
        	addressDomains.add(mapToDomain(a));
        }
        return addressDomains;
    }
	
	@Transactional
	public AddressDomain findById(int id) {
		return mapToDomain(addressDao.findById(id));
	}
	
	@Transactional
	public AddressDomain findByPersonId(int id) {
		return mapToDomain(addressDao.findByPersonId(id));
	}
	
	@Transactional
	public int uploadAddress(AddressDomain addressDomain) {
		Address address = new Address();
		address.setAddressLine1(addressDomain.getAddressLine1());
		address.setAddressLine2(addressDomain.getAddressLine2());
		address.setCity(addressDomain.getCity());
		address.setStateName(addressDomain.getStateName());
		address.setZipCode(addressDomain.getZipCode());

		Person person = new Person();
		person.setId(addressDomain.getPersonId());
		address.setPerson(person);
		return addressDao.save(address);
	}
	
	@Transactional
	public AddressDomain updateAddress(AddressDomain addressDomain) {
		Address address = addressDao.findById(addressDomain.getId());
		address.setAddressLine1(addressDomain.getAddressLine1());
		address.setAddressLine2(addressDomain.getAddressLine2());
		address.setCity(addressDomain.getCity());
		address.setStateName(addressDomain.getStateName());
		address.setZipCode(addressDomain.getZipCode());

		Person person = new Person();
		person.setId(addressDomain.getPersonId());
		address.setPerson(person);
		return mapToDomain(addressDao.merge(address));
    }
	
	public static AddressDomain mapToDomain(Address address) {
		AddressDomain addressDomain = new AddressDomain();
		addressDomain.setId(address.getId());
		addressDomain.setAddressLine1(address.getAddressLine1());
		addressDomain.setAddressLine2(address.getAddressLine2());
		addressDomain.setCity(address.getCity());
		addressDomain.setStateName(address.getStateName());
		addressDomain.setZipCode(address.getZipCode());
		addressDomain.setPersonId(address.getPerson().getId());
		return addressDomain;
	}
}
