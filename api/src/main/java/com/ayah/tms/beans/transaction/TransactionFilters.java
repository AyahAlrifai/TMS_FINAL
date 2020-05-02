package com.ayah.tms.beans.transaction;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TransactionFilters {
	private Integer type;
	private Integer category;
	private LocalDate from;
	private LocalDate to;
	private Boolean frequent;
	private Integer user_id;

	public TransactionFilters(@JsonProperty("type") Integer type,@JsonProperty("category")  Integer category,
			@JsonProperty("from") LocalDate from, @JsonProperty("to") LocalDate to,
			@JsonProperty("frequent") Boolean frequent,@JsonProperty("user_id") Integer user_id) {
		super();
		this.type = type;
		this.category = category;
		this.from = from;
		this.to = to;
		this.frequent = frequent;
		this.user_id=user_id;
	}

	public TransactionFilters() {
		this.type = null;
		this.category = null;
		this.from = null;
		this.to = null;
		this.frequent = null;
		this.user_id=null;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public LocalDate getFrom() {
		return from;
	}

	public void setFrom(LocalDate from) {
		this.from = from;
	}

	public LocalDate getTo() {
		return to;
	}

	public void setTo(LocalDate to) {
		this.to = to;
	}

	public Boolean getFrequent() {
		return frequent;
	}

	public void setFrequent(Boolean frequent) {
		this.frequent = frequent;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

}
