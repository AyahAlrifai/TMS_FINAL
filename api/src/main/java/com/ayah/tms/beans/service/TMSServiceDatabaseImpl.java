package com.ayah.tms.beans.service;

import java.io.*;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.util.ResourceUtils;

import com.ayah.tms.beans.exception.*;
import com.ayah.tms.beans.resource.R;
import com.ayah.tms.beans.transaction.*;

public class TMSServiceDatabaseImpl implements TMSService {
	private Connection connection;
	private String databaseName;
	private String userName;
	private String password;
	private String host;
	private String port;
	private PreparedStatement pstmt;
	private ResultSet result;

	public TMSServiceDatabaseImpl() throws ClassNotFoundException, SQLException, IOException {
		File file = ResourceUtils.getFile("configFile.txt");
		DataInputStream reader = new DataInputStream(new FileInputStream(file));
		this.databaseName = reader.readLine();
		this.userName = reader.readLine();
		this.password = reader.readLine();
		this.host = reader.readLine();
		this.port = reader.readLine();
		reader.close();
		Class.forName("com.mysql.jdbc.Driver");

		connection = DriverManager.getConnection("jdbc:mysql://" + this.host + ":" + this.port + "/" + this.databaseName
				+ "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC",
				this.userName, this.password);
	}

	public int getMonthFrequent(int id) throws SQLException {
		String sqlStatment = "select " + R.Attribute.monthFrequent + " from " + R.Table.frequentTransaction + " where "
				+ R.Attribute.id + "=?";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setInt(1, id);
		ResultSet monthFrequent = this.pstmt.executeQuery();
		if (monthFrequent.next())
			return monthFrequent.getInt(R.Attribute.monthFrequent);
		else
			return 0;
	}

	public Category getCategory(Integer id) throws SQLException {
		String sqlStatment = "select * from " + R.Table.dictionaryEntries + " where " + R.Attribute.id + "=? ";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setInt(1, id);
		ResultSet categortData = this.pstmt.executeQuery();
		if (categortData.next()) {
			return new Category(categortData.getInt(R.Attribute.id), categortData.getInt(R.Attribute.dkey),
					categortData.getString(R.Attribute.value), categortData.getBytes(R.Attribute.icon),
					categortData.getInt(R.Attribute.enable),categortData.getInt(R.Attribute.user_id));
		} else
			return null;
	}

	public int ifValidCategoryReturnType(Integer id) throws SQLException {
		String sqlStatment = "select * from " + R.Table.dictionaryEntries + " where " + R.Attribute.id + "=" + id
				+ " and (" + R.Attribute.dkey + "=1 or " + R.Attribute.dkey + "=2)";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.result = this.pstmt.executeQuery();
		if (this.result.next())
			return this.result.getInt("dkey");
		else
			return 0;
	}

	@Override
	public List<TransactionBase> getTransatcions(TransactionFilters filters) throws SQLException {
		Integer type = filters.getType();
		Integer category = filters.getCategory();
		LocalDate from = filters.getFrom();
		LocalDate to = filters.getTo();
		Boolean frequent = filters.getFrequent();
		Integer user_id=filters.getUser_id();
		String sqlStatment = "";
		if (type == null) {
			if (frequent != null) {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id +",t." + R.Attribute.type + ",t." + R.Attribute.amount
						+ ",t." + R.Attribute.date + ",t." + R.Attribute.category + ",COALESCE(d." + R.Attribute.id
						+ ",0) as \"paymentMethod\",COALESCE(t." + R.Attribute.comment
						+ ",'no comment') as \"comment\",t." + R.Attribute.id + " in(select " + R.Attribute.id
						+ " from " + R.Table.frequentTransaction + ") as \"frequent\" \n" + "FROM "
						+ R.Table.transaction + " as t\n" + "LEFT JOIN " + R.Table.expense + " as e\n" + "ON t."
						+ R.Attribute.id + "=e." + R.Attribute.id + "\n" + "LEFT JOIN " + R.Table.income + " as i\n"
						+ "ON t." + R.Attribute.id + "=i." + R.Attribute.id + "\n" + "LEFT JOIN "
						+ R.Table.dictionaryEntries + " as d\n" + "ON e." + R.Attribute.paymentMethod + "=d."
						+ R.Attribute.id + "\n" + "INNER JOIN " + R.Table.frequentTransaction + " as f \n" + "ON t."
						+ R.Attribute.id + "=f." + R.Attribute.id + "\n";
			} else {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id + ",t." + R.Attribute.type + ",t.amount,t."
						+ R.Attribute.date + ",t.category,COALESCE(d." + R.Attribute.id
						+ ",0) as \"paymentMethod\",COALESCE(t." + R.Attribute.comment
						+ ",'no comment') as \"comment\",t." + R.Attribute.id + " in(select " + R.Attribute.id
						+ " from " + R.Table.frequentTransaction + ") as \"frequent\" \n" + "FROM "
						+ R.Table.transaction + " as t\n" + "LEFT JOIN " + R.Table.expense + " as e\n" + "ON t."
						+ R.Attribute.id + "=e." + R.Attribute.id + "\n" + "LEFT JOIN " + R.Table.income + " as i\n"
						+ "ON t." + R.Attribute.id + "=i." + R.Attribute.id + "\n" + "LEFT JOIN "
						+ R.Table.dictionaryEntries + " as d\n" + "ON e." + R.Attribute.paymentMethod + "=d."
						+ R.Attribute.id + "\n";
			}
		} else if (type == 15) {
			// get Income
			if (frequent != null) {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id +",t."  + R.Attribute.type + ",t." + R.Attribute.amount
						+ ",t." + R.Attribute.date + ",t." + R.Attribute.category + ",COALESCE(t." + R.Attribute.comment
						+ ",'no comment') as \"comment\",f." + R.Attribute.monthFrequent + " as \"Month Frequenr\" \n"
						+ "FROM " + R.Table.transaction + " as t\n" + "INNER JOIN " + R.Table.income + " as i\n"
						+ "ON t." + R.Attribute.id + "=i." + R.Attribute.id + "\n" + "INNER JOIN "
						+ R.Table.frequentTransaction + " as f\n" + "ON t." + R.Attribute.id + "=f." + R.Attribute.id
						+ "\n";

			} else {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id +",t."  + R.Attribute.type + ",t." + R.Attribute.amount
						+ ",t." + R.Attribute.date + ",t." + R.Attribute.category + ",COALESCE(t." + R.Attribute.comment
						+ ",'no comment') as \"comment\",t." + R.Attribute.id + " in(select " + R.Attribute.id
						+ " from " + R.Table.frequentTransaction + ") as \"frequent\"\n" + "FROM " + R.Table.transaction
						+ " as t\n" + "INNER JOIN " + R.Table.income + " as i\n" + "ON t." + R.Attribute.id + "=i."
						+ R.Attribute.id + "\n";
			}

		} else if (type == 16) {
			// get Expense
			if (frequent != null) {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id +",t."  + R.Attribute.type + ",t." + R.Attribute.amount
						+ ",t." + R.Attribute.date + ",t." + R.Attribute.category + ",d." + R.Attribute.id
						+ " as \"paymentMethod\",COALESCE(t." + R.Attribute.comment + ",'no comment') \"comment\",t."
						+ R.Attribute.id + " in(select " + R.Attribute.id + " from " + R.Table.frequentTransaction
						+ ") as \"frequent\" \n" + "FROM " + R.Table.transaction + " as t\n" + "INNER JOIN "
						+ R.Table.expense + " as e\n" + "ON t." + R.Attribute.id + "=e." + R.Attribute.id + "\n"
						+ "INNER JOIN " + R.Table.dictionaryEntries + " as d\n" + "ON e." + R.Attribute.paymentMethod
						+ "=d." + R.Attribute.id + "\n" + "INNER JOIN " + R.Table.frequentTransaction + " as f\n"
						+ "ON t." + R.Attribute.id + "=f." + R.Attribute.id + "\n";

			} else {
				sqlStatment = "SELECT t." + R.Attribute.id +",t."+R.Attribute.user_id +",t."  + R.Attribute.type + ",t." + R.Attribute.amount
						+ ",t." + R.Attribute.date + ",t." + R.Attribute.category + ",d." + R.Attribute.id
						+ " as \"paymentMethod\",COALESCE(t." + R.Attribute.comment + ",'no comment') \"comment\",t."
						+ R.Attribute.id + " in(select " + R.Attribute.id + " from " + R.Table.frequentTransaction
						+ ") as \"frequent\"\n" + "FROM " + R.Table.transaction + " as t\n" + "INNER JOIN "
						+ R.Table.expense + " as e\n" + "ON t." + R.Attribute.id + "=e." + R.Attribute.id + "\n"
						+ "INNER JOIN " + R.Table.dictionaryEntries + " as d\n" + "ON e." + R.Attribute.paymentMethod
						+ "=d." + R.Attribute.id + "\n";
			}
		} else {
			throw new InvalidValueOfType("");
		}
		sqlStatment+="where t."+R.Attribute.user_id+"="+user_id+" ";
		if (from != null && to != null) {
			if (from.isAfter(to)) {
				throw new InvalidDate("FromDate must be befor ToDate");
			}
			sqlStatment += " and t." + R.Attribute.date + ">=DATE(\"" + from + "\") and t." + R.Attribute.date
					+ "<=DATE(\"" + to + "\")";
		} else if (from != null) {
			if (from.isAfter(LocalDate.now())) {
				throw new InvalidDate("can not insert date in future\n");
			}
			sqlStatment += " and t." + R.Attribute.date + ">=DATE(\"" + from + "\")";
		} else if (to != null) {
			if (to.isAfter(LocalDate.now())) {
				throw new InvalidDate("can not insert date in future\n");
			}
			sqlStatment += " and t." + R.Attribute.date + "<=DATE(\"" + to + "\")";
		}

		if (category != null) {
			int categoryType = ifValidCategoryReturnType(category);
			if (categoryType == 0) {
				throw new InvalidValueOfCategory("");
			}
			if ((categoryType == 1 && type != null && type != 15)
					|| (categoryType == 2 && type != null && type != 16)) {
				throw new InvalidCategoryForType("");

			}
				sqlStatment += " AND t." + R.Attribute.category + "=" + category;
		}

		sqlStatment += " ORDER BY t." + R.Attribute.date;
		List<TransactionBase> transactions = new ArrayList<TransactionBase>();
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.result = this.pstmt.executeQuery();
		while (this.result.next()) {
			Category categoryd = getCategory(this.result.getInt(R.Attribute.category));
			TransactionArgument transactionArgument;
			if (this.result.getBoolean("frequent")) {
				// get monthFrequent
				int monthFrequent = getMonthFrequent(this.result.getInt(R.Attribute.id));
				if (this.result.getInt(R.Attribute.type) == 15) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(), 0, monthFrequent,
							this.result.getInt(R.Attribute.user_id));
					TransactionBase frequentIncome = Factory.createTransaction("FrequentIncome", transactionArgument);
					transactions.add(frequentIncome);
				} else if (this.result.getInt(R.Attribute.type) == 16) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(),
							this.result.getInt(R.Attribute.paymentMethod), monthFrequent,
							this.result.getInt(R.Attribute.user_id));
					TransactionBase frequentExpense = Factory.createTransaction("FrequentExpense", transactionArgument);
					transactions.add(frequentExpense);
				}
			} else {
				if (this.result.getInt(R.Attribute.type) == 15) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(), 0, 0,
							this.result.getInt(R.Attribute.user_id));
					TransactionBase income = Factory.createTransaction("Income", transactionArgument);
					transactions.add(income);
				} else if (this.result.getInt(R.Attribute.type) == 16) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(),
							this.result.getInt(R.Attribute.paymentMethod), 0,
							this.result.getInt(R.Attribute.user_id));
					TransactionBase expense = Factory.createTransaction("Expense", transactionArgument);
					transactions.add(expense);
				}
			}
		}

		return transactions;
	}

	@Override
	public List<Category> getCategories(Integer type,Integer user_id) throws SQLException {
		String sqlStatment = "select * from " + R.Table.dictionaryEntries + " where " + R.Attribute.dkey + "=? and "
				+ R.Attribute.enable + "=1 and "+R.Attribute.user_id+"=?";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setInt(1, type);
		this.pstmt.setInt(2, user_id);
		this.result = this.pstmt.executeQuery();
		List<Category> category = new ArrayList<Category>();
		while (this.result.next()) {
			category.add(new Category(this.result.getInt(R.Attribute.id), this.result.getInt(R.Attribute.dkey),
					this.result.getString(R.Attribute.value), this.result.getBytes(R.Attribute.icon),
					this.result.getInt(R.Attribute.enable),this.result.getInt(R.Attribute.user_id)));
		}
		return category;
	}

	@Override
	public void addIncome(Income income) throws SQLException {
		String addTransactionQuery = "insert into " + R.Table.transaction + " (" + R.Attribute.type + ", amount, "
				+ R.Attribute.category + ", " + R.Attribute.comment + ", " + R.Attribute.date+"," +R.Attribute.user_id+ ")"
				+ "values (?, ?, ?, ?, ?,?)";

		pstmt = connection.prepareStatement(addTransactionQuery);
		if (income.getType() == 15)
			pstmt.setInt(1, income.getType());
		else
			throw new InvalidValueOfType("");

		if (income.getAmount() > 0)
			pstmt.setDouble(2, income.getAmount());
		else
			throw new InvalidValueOfAmount("income amount must be positive");
		pstmt.setInt(3, income.getCategory().getId());
		pstmt.setString(4, income.getComment());
		if (income.getDate().isAfter(LocalDate.now())) {
			throw new InvalidDate("can not insert date in future");
		} else {
			pstmt.setDate(5, Date.valueOf(income.getDate()));
		}
		pstmt.setInt(6, income.getUser_id());
		pstmt.executeUpdate();

		int transId = 0;
		String idQuery = "select " + R.Table.transaction + "." + R.Attribute.id + " from " + R.Table.transaction
				+ " \r\n" + "  where " + R.Attribute.type + "=15 AND " + R.Table.transaction + "." + R.Attribute.id
				+ " NOT IN (select " + R.Table.income + "." + R.Attribute.id + " from " + R.Table.income + ")";
		pstmt = connection.prepareStatement(idQuery);
		result = pstmt.executeQuery(idQuery);

		if (result.next()) {
			transId = result.getInt(1);
		}

		String addIncomeQuery = "insert into " + R.Table.income + " (" + R.Attribute.id + ")  \r\n" + " values( ? ) ";
		pstmt = connection.prepareStatement(addIncomeQuery);
		pstmt.setInt(1, transId);
		pstmt.executeUpdate();

		if (income instanceof FrequentIncome) {

			String addIncomeFrequentQuery = " insert into "+R.Table.frequentTransaction+" (" + R.Attribute.id + ", "
					+ R.Attribute.monthFrequent + ") \r\n" + "  values (?, ?)";

			pstmt = connection.prepareStatement(addIncomeFrequentQuery);
			pstmt.setInt(1, transId);
			pstmt.setInt(2, ((FrequentIncome) income).getMonthFrequent());

			pstmt.executeUpdate();
		}
	}

	@Override
	public void addExpense(Expense expense) throws SQLException {

		String addTransactionQuery = "insert into " + R.Table.transaction + " (" + R.Attribute.type + ","
				+ R.Attribute.amount + ", " + R.Attribute.category + "," + R.Attribute.comment + ", " + R.Attribute.date
				+"," +R.Attribute.user_id
				+ ") values (?, ?, ?, ?, ?,?) ";

		pstmt = connection.prepareStatement(addTransactionQuery);
		if (expense.getType() == 16)
			pstmt.setInt(1, expense.getType());
		else
			throw new InvalidValueOfType("");

		if (expense.getAmount() < 0)
			pstmt.setDouble(2, expense.getAmount());
		else
			throw new InvalidValueOfAmount("expense amount must be negative");
		pstmt.setInt(3, expense.getCategory().getId());
		pstmt.setString(4, expense.getComment());
		if (expense.getDate().isAfter(LocalDate.now())) {
			throw new InvalidDate("can not insert date in future");
		} else {
			pstmt.setDate(5, Date.valueOf(expense.getDate()));
		}
		pstmt.setInt(6,expense.getUser_id());
		pstmt.executeUpdate();

		String query = "select " + R.Table.transaction + "." + R.Attribute.id + " \r\n" + " from " + R.Table.transaction
				+ "\r\n" + " where " + R.Attribute.type + "=16 AND " + R.Table.transaction + "." + R.Attribute.id
				+ " NOT IN (select " + R.Table.expense + "." + R.Attribute.id + " from " + R.Table.expense + ")";

		pstmt = connection.prepareStatement(query);
		ResultSet r = pstmt.executeQuery(query);
		int id = 0;
		if (r.next()) {
			id = r.getInt(1);
		}
		String addExpenseQuery = "insert into " + R.Table.expense + " (" + R.Attribute.id + ","
				+ R.Attribute.paymentMethod + ") values (?,?)";

		pstmt = connection.prepareStatement(addExpenseQuery);
		pstmt.setInt(1, id);
		if (expense.getPaymentMethod() == 13 || expense.getPaymentMethod() == 14)
			pstmt.setInt(2, expense.getPaymentMethod());
		else
			throw new InvalidPaymentMethod("");

		pstmt.executeUpdate();

		if (expense instanceof FrequentExpense)

		{

			String addFrequantQuery = "insert into " + R.Table.frequentTransaction + " (" + R.Attribute.id + ", "
					+ R.Attribute.monthFrequent + ") values (?,?)";

			pstmt = connection.prepareStatement(addFrequantQuery);
			pstmt.setInt(1, id);
			pstmt.setInt(2, ((FrequentExpense) expense).getMonthFrequent());
			pstmt.executeUpdate();

		}

	}

	@Override
	public void addCategory(Category category) throws SQLException {
		pstmt = connection.prepareStatement("SELECT EXISTS(SELECT * from " + R.Table.dictionaryEntries + " WHERE "
				+ R.Attribute.dkey + "=? and " + R.Attribute.value + "=? and " + R.Attribute.enable + "=1 and " +
				R.Attribute.user_id+"=? )");
		pstmt.setInt(1, category.getDkey());
		pstmt.setString(2, category.getValue());
		pstmt.setInt(3, category.getUser_id());
		result = pstmt.executeQuery();
		result.next();
		if (result.getBoolean(1) == false) {
			pstmt = connection.prepareStatement("INSERT INTO " + R.Table.dictionaryEntries + "(" + R.Attribute.dkey
					+ "," + R.Attribute.value + "," + R.Attribute.icon+ "," + R.Attribute.user_id + ") VALUES(?,?,?,?)");

			pstmt.setInt(1, category.getDkey());
			pstmt.setString(2, category.getValue());
			pstmt.setBytes(3, category.getIconPath());
			pstmt.setInt(4,category.getUser_id());
			pstmt.executeUpdate();
		} else {
			throw new ThisCategoryExists("");
		}

	}

	@Override
	public void removeCategory(Integer id) throws SQLException {

		String removeCategoryQuery = "update  " + R.Table.dictionaryEntries + " set " + R.Attribute.enable
				+ " = '0' where " + R.Attribute.id + " = ? ";
		pstmt = connection.prepareStatement(removeCategoryQuery);
		pstmt.setInt(1, id);
		pstmt.executeUpdate();

	}

	@Override
	public void updateCategory(Category category) throws SQLException {

		pstmt = connection.prepareStatement(
				"UPDATE  " + R.Table.dictionaryEntries + " set " + R.Attribute.value + "=?,"
						+ R.Attribute.icon + "=? where " + R.Attribute.id + "=? and " + R.Attribute.enable + "='1'");
		pstmt.setBytes(2, category.getIconPath());
		pstmt.setString(1, category.getValue());
		pstmt.setInt(3, category.getId());
		pstmt.executeUpdate();

	}

	@Override
	public void updateTranFrequent(Integer transactionId, Integer monthFrequent) throws SQLException {
		String sqlStatmen = "select * from " + R.Table.frequentTransaction + " where " + R.Attribute.id + "="
				+ transactionId;
		pstmt = connection.prepareStatement(sqlStatmen);
		this.result = this.pstmt.executeQuery();
		if (this.result.next()) {
			if (monthFrequent > 0) {
				try {
					String updateFrequantQuery = "update " + R.Table.frequentTransaction + " set "
							+ R.Attribute.monthFrequent + "=? where " + R.Attribute.id + "=?";
					pstmt = connection.prepareStatement(updateFrequantQuery);
					pstmt.setInt(2, transactionId);
					pstmt.setInt(1, monthFrequent);
					pstmt.executeUpdate();
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}

			} else if (monthFrequent == 0) {
				try {
					String removeFrequantQuery = "delete from " + R.Table.frequentTransaction + " where "
							+ R.Attribute.id + " =?";

					pstmt = connection.prepareStatement(removeFrequantQuery);
					pstmt.setInt(1, transactionId);
					pstmt.execute();
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			} else {
				throw new InvalidMonthFrequent("");
			}

		} else {
			if (monthFrequent > 0) {
				try {
					String addFrequantQuery = "insert into " + R.Table.frequentTransaction + " (" + R.Attribute.id
							+ ", " + R.Attribute.monthFrequent + ") values (?,?)";

					pstmt = connection.prepareStatement(addFrequantQuery);
					pstmt.setInt(1, transactionId);
					pstmt.setInt(2, monthFrequent);
					pstmt.executeUpdate();
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			} else if (monthFrequent != 0) {
				throw new InvalidMonthFrequent("");
			}
		}

		// return true;
	}

	@Override
	public double getBalance(TransactionFilters filters) throws SQLException {
		String sqlStatment = "";
		ResultSet total = null;
		if (filters.getType() == null) {
			if (filters.getFrequent() != null) {
				sqlStatment += "SELECT sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t  ,  "
						+ R.Table.frequentTransaction + " as ft where t." + R.Attribute.id + "=ft." + R.Attribute.id;

			} else {
				sqlStatment += "select sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t where t."
						+ R.Attribute.id + ">0 ";
			}
		} else if (filters.getType() == 15) {
			// get Income
			if (filters.getFrequent() != null) {
				sqlStatment += "SELECT sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t  ,  "
						+ R.Table.frequentTransaction + " as ft where  t." + R.Attribute.id + "=ft." + R.Attribute.id
						+ " and t." + R.Attribute.type + "=15";

			} else {
				sqlStatment += "select sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t  where "
						+ R.Attribute.type + "=15 ";
			}
		} else if (filters.getType() == 16) {
			// get Expense
			if (filters.getFrequent() != null) {
				sqlStatment += "SELECT sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t  ,  "
						+ R.Table.frequentTransaction + " as ft where t." + R.Attribute.id + "=ft." + R.Attribute.id
						+ " and t." + R.Attribute.type + "=16";
			} else {

				sqlStatment += "select sum(" + R.Attribute.amount + ") from " + R.Table.transaction + " as t  where "
						+ R.Attribute.type + "=16 ";
			}
		} else {
			throw new InvalidValueOfType("");
		}

		LocalDate from = filters.getFrom();
		LocalDate to = filters.getTo();

		if (from != null && to != null) {
			if (from.isAfter(to)) {
				throw new InvalidDate("FromDate must be befor ToDate");
			}
			sqlStatment += " and t." + R.Attribute.date + ">=DATE(\"" + from + "\") and t." + R.Attribute.date
					+ "<=DATE(\"" + to + "\")";
		} else if (filters.getFrom() != null) {
			if (from.isAfter(LocalDate.now())) {
				throw new InvalidDate("can not insert date in future\n");
			}
			sqlStatment += " and t." + R.Attribute.date + ">=DATE(\"" + from + "\")";
		} else if (filters.getTo() != null) {
			if (to.isAfter(LocalDate.now())) {
				throw new InvalidDate("can not insert date in future\n");
			}
			sqlStatment += " and t." + R.Attribute.date + "<=DATE(\"" + to + "\")";
		}
		if (filters.getCategory() != null) {
			int categoryType = ifValidCategoryReturnType(filters.getCategory());
			if (categoryType == 0) {
				throw new InvalidValueOfCategory("");
			}
			if ((categoryType == 1 && filters.getType() != null && filters.getType() != 15)
					|| (categoryType == 2 && filters.getType() != null && filters.getType() != 16)) {
				throw new InvalidCategoryForType("");

			}

			sqlStatment += " AND t." + R.Attribute.category + "=" + filters.getCategory();
		}
		sqlStatment += " AND t." + R.Attribute.user_id + "=" +filters.getUser_id();
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		total = this.pstmt.executeQuery();
		if (total.next())
			return total.getDouble(1);
		return 0;

	}

	@Override
	public List<Dictionary> getDictionary(int dkey) throws SQLException {
		List<Dictionary> types = new ArrayList<Dictionary>();
		String sqlStatment = "select " + R.Attribute.id + "," + R.Attribute.value + " from " + R.Table.dictionaryEntries
				+ " where " + R.Attribute.dkey + "=" + dkey;
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		result = this.pstmt.executeQuery();
		while (result.next()) {
			types.add(new Dictionary(this.result.getInt("id"), this.result.getString("value")));
		}
		return types;
	}

	public Category returnLastCategory(Integer user_id) throws SQLException {
		String sqlStatment = "SELECT * FROM "+R.Table.dictionaryEntries+" where (dkey=1 or dkey=2) and user_id=? ORDER BY ID DESC LIMIT 1;";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setInt(1, user_id);
		result = this.pstmt.executeQuery();
		if (result.next()) {
			return new Category(result.getInt(R.Attribute.id), result.getInt(R.Attribute.dkey),
					result.getString(R.Attribute.value), result.getBytes(R.Attribute.icon),
					result.getInt(R.Attribute.enable),user_id);
		}
		return null;

	}

	public TransactionBase returnLastTransaction(Integer user_id) throws SQLException {
		String sqlStatment = "SELECT t.id,t.type,t.amount,t.date,t.category,"+
				"COALESCE(d.id,0) as \"paymentMethod\",COALESCE(t.comment,'no comment') as \"comment\","+
				"t.id in(select id from FrequentTransaction) as \"frequent\"  FROM Transaction as t LEFT "+
				"JOIN Expense as e ON t.id=e.id LEFT JOIN Income as i ON t.id=i.id LEFT JOIN DictionaryEntries "+
				"as d ON e.paymentMethod=d.id where t.user_id="+user_id+" ORDER BY id desc limit 1";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.result = this.pstmt.executeQuery();
		if (this.result.next()) {
			Category categoryd = getCategory(this.result.getInt(R.Attribute.category));
			TransactionArgument transactionArgument;
			if (this.result.getBoolean("frequent")) {
				// get monthFrequent
				int monthFrequent = getMonthFrequent(this.result.getInt(R.Attribute.id));
				if (this.result.getInt(R.Attribute.type) == 15) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(), 0, monthFrequent,user_id);
					TransactionBase frequentIncome = Factory.createTransaction("FrequentIncome", transactionArgument);
					return frequentIncome;
				} else if (this.result.getInt(R.Attribute.type) == 16) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(),
							this.result.getInt(R.Attribute.paymentMethod), monthFrequent,user_id);
					TransactionBase frequentExpense = Factory.createTransaction("FrequentExpense", transactionArgument);
					return frequentExpense;
				}
			} else {
				if (this.result.getInt(R.Attribute.type) == 15) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(), 0, 0,user_id);
					TransactionBase income = Factory.createTransaction("Income", transactionArgument);
					return income;
				} else if (this.result.getInt(R.Attribute.type) == 16) {
					transactionArgument = new TransactionArgument(this.result.getInt(R.Attribute.id),
							this.result.getInt(R.Attribute.type), this.result.getDouble(R.Attribute.amount), categoryd,
							this.result.getString(R.Attribute.comment),
							this.result.getDate(R.Attribute.date).toLocalDate(),
							this.result.getInt(R.Attribute.paymentMethod), 0,user_id);
					TransactionBase expense = Factory.createTransaction("Expense", transactionArgument);
					return expense;
				}
			}
		}

		return null;
	}

	@Override
	public User addUser(User user) throws SQLException {
		this.pstmt = this.connection.prepareStatement("SELECT EXISTS(SELECT * from " + R.Table.user + " WHERE "
				+ R.Attribute.email + "=?)");
		pstmt.setString(1, user.getEmail());
		result = pstmt.executeQuery();
		result.next();
		if (result.getBoolean(1) == false) {
			String sqlStatment="insert into "+R.Table.user+" values(?,?,?,?,?)";
			pstmt = connection.prepareStatement(sqlStatment);
			pstmt.setInt(1,0);
			pstmt.setString(2,user.getName());
			pstmt.setString(3,user.getEmail());
			pstmt.setString(4,user.getPassword());
			pstmt.setBytes(5, user.getPhoto());
			pstmt.executeUpdate();
			sqlStatment="select * from User where email=?";
			this.pstmt = this.connection.prepareStatement(sqlStatment);
			this.pstmt.setString(1, user.getEmail());
			this.result=this.pstmt.executeQuery();
			if(result.next()) {
				return new User(result.getInt("id"),result.getString("name"),result.getString("email")
						,result.getString("password"),result.getBytes("photo"));
			}
		}
		return null;
	}

	@Override
	public User authentication(User user) throws SQLException {
		String sqlStatment="select * from User where email=? and password=?";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setString(1,user.getEmail());
		this.pstmt.setString(2, user.getPassword());
		this.result=this.pstmt.executeQuery();
		if(result.next()) {
			return new User(result.getInt("id"),result.getString("name"),result.getString("email")
					,result.getString("password"),result.getBytes("photo"));
		}
		return null;
	}

	@Override
	public User updateUserInfo(User user) throws SQLException {
		String sqlStatment="select * from "+R.Table.user+" where "+R.Attribute.email+"=? or "+R.Attribute.id+"=?";
		this.pstmt = this.connection.prepareStatement(sqlStatment);
		this.pstmt.setString(1,user.getEmail());
		this.pstmt.setInt(2,user.getId());
		this.result=this.pstmt.executeQuery();
		result.next();
		System.out.println(result.isLast() +"..."+ result.isFirst());
		if(result.isLast() && result.isFirst()) {
			System.out.println("one email");
			sqlStatment="update "+R.Table.user+" set "+R.Attribute.name+"=?,"+R.Attribute.email+"=?,"+R.Attribute.photo+"=?,"+R.Attribute.password+"=? where "+R.Attribute.id+"=?";
			this.pstmt = this.connection.prepareStatement(sqlStatment);
			this.pstmt.setString(1,user.getName());
			this.pstmt.setString(2,user.getEmail());
			this.pstmt.setBytes(3,user.getPhoto());
			this.pstmt.setString(4,user.getPassword());
			this.pstmt.setInt(5,user.getId());
			pstmt.executeUpdate();
			sqlStatment="select * from User where email=?";
			this.pstmt = this.connection.prepareStatement(sqlStatment);
			this.pstmt.setString(1, user.getEmail());
			this.result=this.pstmt.executeQuery();
			if(result.next()) {
				System.out.println("new data");
				return new User(result.getInt("id"),result.getString("name"),result.getString("email")
						,result.getString("password"),result.getBytes("photo"));
			}
		} else {
			System.out.println("two email");
		}

		return null;
	}
	
	

}
