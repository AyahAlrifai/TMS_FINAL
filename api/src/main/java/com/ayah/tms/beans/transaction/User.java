package com.ayah.tms.beans.transaction;

import java.sql.Blob;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	private Integer id;
	private String name;
	private String email;
	private String password;
	private byte[] photo;
	public User(@JsonProperty("id") Integer id,@JsonProperty("name") String name,
			@JsonProperty("email") String email,@JsonProperty("password") String password,
			@JsonProperty("photo") byte[] photo) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.photo = photo;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public byte[] getPhoto() {
		return photo;
	}
	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}
	
}
