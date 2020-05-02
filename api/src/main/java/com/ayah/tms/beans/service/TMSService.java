package com.ayah.tms.beans.service;

import java.sql.SQLException;
import java.util.List;

import com.ayah.tms.beans.transaction.*;

public interface TMSService {

	public List<TransactionBase> getTransatcions(TransactionFilters filters) throws SQLException;

	public List<Category> getCategories(Integer type,Integer user_id) throws SQLException;

	public void addIncome(Income income) throws SQLException;

	public void addExpense(Expense expense) throws SQLException;

	public void addCategory(Category category) throws SQLException;

	public void removeCategory(Integer id) throws SQLException;

	public void updateCategory(Category category) throws SQLException;

	public void updateTranFrequent(Integer transactionId, Integer monthFrequent) throws SQLException;

	public double getBalance(TransactionFilters filters) throws SQLException;

	public List<Dictionary> getDictionary(int dkey) throws SQLException;
	
	public User addUser(User user) throws SQLException;
	
	public User authentication(User user) throws SQLException;
	
	public User updateUserInfo(User user) throws SQLException;
}
