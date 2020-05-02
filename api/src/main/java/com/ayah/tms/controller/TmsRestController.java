package com.ayah.tms.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ayah.tms.beans.service.*;
import com.ayah.tms.beans.transaction.*;

@RestController
@RequestMapping("/api")
public class TmsRestController {

	@CrossOrigin
	@GetMapping("/types")
	public List<Dictionary> getType() {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getDictionary(4);
		} catch (SQLException | ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/user")
	public User addUser(@RequestBody User user) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.addUser(user);
		} catch (SQLException | ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/authentication")
	public User authentication(@RequestBody User user) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.authentication(user);
		} catch (SQLException | ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@GetMapping("/paymentMethods")
	public List<Dictionary> getPaymentMethod() {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getDictionary(3);
		} catch (SQLException | ClassNotFoundException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/transaction")
	public List<TransactionBase> getTransaction(@RequestBody TransactionFilters filter) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getTransatcions(filter);
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/balance")
	public double getBalance(@RequestBody TransactionFilters filter) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getBalance(filter);
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@CrossOrigin
	@GetMapping("/category/income")
	public List<Category> getIncomeCtegories(@RequestParam Integer user_id) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getCategories(1,user_id);

		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	@CrossOrigin
	@GetMapping("/category/expense")
	public List<Category> getExpenseCtegories(@RequestParam Integer user_id) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.getCategories(2,user_id);

		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	@CrossOrigin
	@PutMapping("/category/income")
	public String updateIncomeCategory(@RequestBody Category category) {
		TMSServiceDatabaseImpl tmsService;
		try {
			category.setDkey(1);
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.updateCategory(category);
			return "done";
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PutMapping("/category/expense")
	public String updateExpenseCategory(@RequestBody Category category) {
		TMSServiceDatabaseImpl tmsService;
		try {
			category.setDkey(2);
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.updateCategory(category);
			return "done";
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/category/income")
	public Category addIncomeCategory(@RequestBody Category category) {
		TMSServiceDatabaseImpl tmsService;
		try {
			category.setDkey(1);
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.addCategory(category);
			return tmsService.returnLastCategory(category.getUser_id());
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/category/expense")
	public Category addExpenseCategory(@RequestBody Category category) {
		TMSServiceDatabaseImpl tmsService;
		try {
			category.setDkey(2);
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.addCategory(category);
			return tmsService.returnLastCategory(category.getUser_id());
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PutMapping("/category/{id}")
	public String deleteCategory(@PathVariable int id) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.removeCategory(id);
			return "Deleted category id - " + id;
		} catch (ClassNotFoundException | SQLException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "exception";
		}

	}

	@CrossOrigin
	@PostMapping("/transaction/income")
	public Income addIncome(@RequestBody Income income) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			income.setType(15);
			tmsService.addIncome(income);
			return (Income) tmsService.returnLastTransaction(income.getUser_id());
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/transaction/expense")
	public Expense addExpense(@RequestBody Expense expense) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			expense.setType(16);
			tmsService.addExpense(expense);
			return (Expense) tmsService.returnLastTransaction(expense.getUser_id());
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@CrossOrigin
	@PostMapping("/transaction/{transactionId}/{monthFrequent}")
	public String updateFrequent(@PathVariable int transactionId, @PathVariable int monthFrequent) {
		TMSServiceDatabaseImpl tmsService;
		try {
			tmsService = new TMSServiceDatabaseImpl();
			tmsService.updateTranFrequent(transactionId, monthFrequent);
			return "update";
		} catch (ClassNotFoundException | SQLException | IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	@CrossOrigin
	@PutMapping("/user")
	public User updateUserInfo(@RequestBody User user) {
		TMSServiceDatabaseImpl tmsService;
		try {
			System.out.println("api");
			tmsService = new TMSServiceDatabaseImpl();
			return tmsService.updateUserInfo(user);
		} catch (SQLException | ClassNotFoundException | IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
