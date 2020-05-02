package com.ayah.tms.beans.transaction;

import java.time.LocalDate;

public class FrequentExpense extends Expense implements Frequent {

	private int monthFrequent;

	FrequentExpense(Integer id, Integer type, Double amount, Category category, String comment, LocalDate date,
			Integer pymentMethod, Integer monthFrequent,Integer user_id) {
		super(id, type, amount, category, comment, date, pymentMethod,user_id);
		this.monthFrequent = monthFrequent;
	}

	@Override
	public Integer getMonthFrequent() {
		return monthFrequent;
	}

	@Override
	public void setMonthFrequent(Integer monthFrequent) {
		this.monthFrequent = monthFrequent;

	}

}
