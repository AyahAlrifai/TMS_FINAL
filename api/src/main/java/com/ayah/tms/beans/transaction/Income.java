package com.ayah.tms.beans.transaction;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Income extends TransactionBase {

	public Income(@JsonProperty("id") Integer id, @JsonProperty("type") Integer type,
			@JsonProperty("amount") Double amount, @JsonProperty("category") Category category,
			@JsonProperty("comment") String comment, @JsonProperty("date") LocalDate date,
			@JsonProperty("user_id") Integer user_id) {
		super(id, type, amount, category, comment, date,user_id);
	}
}
