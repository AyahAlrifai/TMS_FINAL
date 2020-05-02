package com.ayah.tms.beans.transaction;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Expense extends TransactionBase {

	private Integer paymentMethod;

	public Expense(@JsonProperty("id") Integer id, @JsonProperty("type") Integer type,
			@JsonProperty("amount") Double amount, @JsonProperty("category") Category category,
			@JsonProperty("comment") String comment, @JsonProperty("date") LocalDate date,
			@JsonProperty("paymentMethod") Integer paymentMethod,@JsonProperty("user_id") Integer user_id) {
		super(id, type, amount, category, comment, date,user_id);
		this.paymentMethod = paymentMethod;
	}

	public Integer getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(Integer paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

}
