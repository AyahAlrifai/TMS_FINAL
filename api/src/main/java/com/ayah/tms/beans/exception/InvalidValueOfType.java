package com.ayah.tms.beans.exception;

public class InvalidValueOfType extends TMSException {

	private static final long serialVersionUID = 1L;

	public InvalidValueOfType(String message) {
		super(message, "TMS:2");
	}
	
}