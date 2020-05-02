package com.ayah.tms.server.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = {"com.ayah"})
public class TransactionModuleSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(TransactionModuleSystemApplication.class, args);
	}

//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/api").allowedOrigins("http://localhost:8080");
//				registry.addMapping("/api/types").allowedOrigins("http://localhost:8080");
//				registry.addMapping("/types").allowedOrigins("http://localhost:8080");
//			}
//		};
//	}
}

