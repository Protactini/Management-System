package com.example.w7pg2_backend.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

//Source material: https://javapapers.com/java/contact-form-using-javamail-jsp/
public class JavaEmail {

	Properties emailProperties;
	Session mailSession;
	MimeMessage emailMessage;

	String emailHost = "smtp.gmail.com";
	String emailPort = "587";
	String fromUser = "phongfly123@gmail.com";
	String fromUserEmailPassword = "fasgrkcwrvsnwzgl";

	public void setMailServerProperties() {
		emailProperties = System.getProperties();
		emailProperties.put("mail.smtp.port", emailPort);
		emailProperties.put("mail.smtp.auth", "true");
		emailProperties.put("mail.smtp.starttls.enable", "true");
	}

	public void createEmailMessage(String emailSubject, String emailBody, String toEmails)
			throws AddressException, MessagingException {
		mailSession = Session.getDefaultInstance(emailProperties, null);
		emailMessage = new MimeMessage(mailSession);
		emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmails));
		emailMessage.setSubject(emailSubject);
		emailMessage.setContent(emailBody, "text/html");// for a html email
		// emailMessage.setText(emailBody);// for a text email

	}

	public void sendEmail() throws AddressException, MessagingException {
		Transport transport = mailSession.getTransport("smtp");
		transport.connect(emailHost, fromUser, fromUserEmailPassword);
		transport.sendMessage(emailMessage, emailMessage.getAllRecipients());
		transport.close();
	}
}