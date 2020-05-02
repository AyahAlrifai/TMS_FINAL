package com.ayah.tms.beans.transaction;

public class Factory {
	public static TransactionBase createTransaction(String transactionType, TransactionArgument arguments) {
		switch (transactionType) {
		case "Income":
			return new Income(arguments.getId(), arguments.getType(), arguments.getAmount(), arguments.getCategory(),
					arguments.getComment(), arguments.getDate(),arguments.getUser_id());
		case "Expense":
			return new Expense(arguments.getId(), arguments.getType(), arguments.getAmount(), arguments.getCategory(),
					arguments.getComment(), arguments.getDate(), arguments.getPymentMethod(),arguments.getUser_id());
		case "FrequentIncome":
			return new FrequentIncome(arguments.getId(), arguments.getType(), arguments.getAmount(),
					arguments.getCategory(), arguments.getComment(), arguments.getDate(), arguments.getMonthFrequent(),
					arguments.getUser_id());
		case "FrequentExpense":
			return new FrequentExpense(arguments.getId(), arguments.getType(), arguments.getAmount(),
					arguments.getCategory(), arguments.getComment(), arguments.getDate(), arguments.getPymentMethod(),
					arguments.getMonthFrequent(),arguments.getUser_id());
		default:
			return null;
		}
	}
}