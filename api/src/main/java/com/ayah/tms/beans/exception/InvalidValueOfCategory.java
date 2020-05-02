package com.ayah.tms.beans.exception;

public class InvalidValueOfCategory extends TMSException{

	private static final long serialVersionUID = 1L;

	public InvalidValueOfCategory(String message) {
		super(message, "TMS:3");
	}

}