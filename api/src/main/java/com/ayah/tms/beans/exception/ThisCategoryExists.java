package com.ayah.tms.beans.exception;

public class ThisCategoryExists extends TMSException {

	private static final long serialVersionUID = 1L;

	public ThisCategoryExists(String message) {
		super(message, "TMS:9");
	}

}
