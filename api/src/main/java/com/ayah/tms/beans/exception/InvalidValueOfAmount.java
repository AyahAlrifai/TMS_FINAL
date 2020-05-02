package com.ayah.tms.beans.exception;

public class InvalidValueOfAmount extends TMSException {
	private static final long serialVersionUID = 1L;

	public InvalidValueOfAmount(String message) {
		super(message, "TMS:1");
	}
}
