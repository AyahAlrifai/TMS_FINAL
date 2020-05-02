package com.ayah.tms.beans.exception;

public class TMSError {

	public static String getMessage(TMSException e) {
		switch (e.getErrorCode()) {
		case "TMS:1":
			return "invalid value of amount,";
		case "TMS:2":
			return "invalid value of type,enetr 15 for income and 16 for expense";
		case "TMS:3":
			return "invalid value of category,run GET https://tms-api-alrifai.herokuapp.com/api/category/{Type} to know available categories for each type";
		case "TMS:4":
			return " invalid value of category for this type,run GET https://tms-api-alrifai.herokuapp.com/api/category/15 to know the categories for income,run GET https://tms-api-alrifai.herokuapp.com/api/category/16 to know the categories for expense";
		case "TMS:5":
			return "invalid date,";
		case "TMS:6":
			return "the value of frequent must be 'true'";
		case "TMS:7":
			return "invalid value of PaymentMethod";
		case "TMS:8":
			return "value of month frequent must be greater than or equal zero";
		case "TMS:9":
			return "this category is exists";
		}
		return "";
	}

}
