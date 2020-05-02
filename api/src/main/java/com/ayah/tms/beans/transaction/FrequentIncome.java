package com.ayah.tms.beans.transaction;

import java.time.LocalDate;

public class FrequentIncome extends Income implements Frequent {
	private int monthFrequent;

	FrequentIncome(Integer id, Integer type, Double amount, Category category, String comment, LocalDate date,
			Integer monthFrequent,Integer user_id) {
		super(id, type, amount, category, comment, date,user_id);
		this.monthFrequent = monthFrequent;
		// TODO Auto-generated constructor stub
	}

	@Override
	public Integer getMonthFrequent() {
		// TODO Auto-generated method stub
		return monthFrequent;
	}

	@Override
	public void setMonthFrequent(Integer monthFrequent) {
		this.monthFrequent = monthFrequent;
		// TODO Auto-generated method stub

	}
}
