package com.ayah.tms.beans.transaction;

import java.time.LocalDate;

public interface Transaction {

	public Integer getId();

	public void setId(Integer id);

	public Integer getType();

	public void setType(Integer type);

	public Double getAmount();

	public void setAmount(Double amount);

	public Category getCategory();

	public void setCategory(Category category);

	public String getComment();

	public void setComment(String comment);

	public LocalDate getDate();

	public void setDate(LocalDate date);
	
	public Integer getUser_id();

	public void setUser_id(Integer user_id);
}
