package com.ayah.tms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ayah.tms.beans.exception.*;

@ControllerAdvice
public class CustomerRestExceptionHandler {
	
	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(Exception exc) {
		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(InvalidValueOfType exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(),
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(ThisCategoryExists exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(),
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(InvalidCategoryForType exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(),
				TMSError.getMessage(exc)+exc.getMessage(),System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(InvalidDate exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(), 
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(InvalidFrequentValue exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(),
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(InvalidValueOfCategory exc) {

		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(), 
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler
	public ResponseEntity<TmsErrorResponse> handleException(TMSException exc) {
		TmsErrorResponse error = new TmsErrorResponse(HttpStatus.BAD_REQUEST.value(), 
				TMSError.getMessage(exc)+exc.getMessage(),
				System.currentTimeMillis());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

}
