package com.ayah.tms.beans.exception;

public class InvalidPaymentMethod extends TMSException {
	private static final long serialVersionUID = 1L;

	public InvalidPaymentMethod(String message) {
		super(message, "TMS:7");
	}
}

