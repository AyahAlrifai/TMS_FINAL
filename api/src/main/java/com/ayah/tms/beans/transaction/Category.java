package com.ayah.tms.beans.transaction;

import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Category {

	private Integer id;
	private Integer dkey;
	private String value;
	private byte[] iconPath;
	private Integer enable;
	private Integer user_id;
	
	public Category(Integer id) {
		super();
		this.id = id;
		this.dkey = null;
		this.value = null;
		this.iconPath = null;
		this.enable = null;
	}

	public Category(@JsonProperty("id") Integer id, @JsonProperty("dkey") Integer dkey,
			@JsonProperty("value") String value, @JsonProperty("iconPath") byte[] iconPath,
			@JsonProperty("enable") Integer enable,@JsonProperty("user_id") Integer user_id) {
		super();
		this.id = id;
		this.dkey = dkey;
		this.value = value;
		this.iconPath = iconPath;
		this.enable = enable;
		this.user_id=user_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDkey() {
		return dkey;
	}

	public void setDkey(Integer dkey) {
		this.dkey = dkey;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public byte[] getIconPath() {
		return iconPath;
	}

	public void setIconPath(byte[] iconPath) {
		this.iconPath = iconPath;
	}

	public Integer getEnable() {
		return enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	
}
