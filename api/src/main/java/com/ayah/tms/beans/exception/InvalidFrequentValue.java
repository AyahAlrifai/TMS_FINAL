package com.ayah.tms.beans.exception;

public class InvalidFrequentValue extends TMSException {

	private static final long serialVersionUID = 1L;

	public InvalidFrequentValue(String message) {
		super(message, "TMS:6");
	}

}