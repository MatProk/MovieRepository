package com.wsiiz.moviesrepo.controller;

import com.wsiiz.moviesrepo.message.request.RegisterRequest;
import com.wsiiz.moviesrepo.message.request.SignInRequest;
import com.wsiiz.moviesrepo.message.response.JwtResponse;
import com.wsiiz.moviesrepo.service.sign.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@RequestMapping("/api/auth")
public class SignController {

	@Autowired
	SignService signService;

	public SignController(SignService signService) {
		this.signService = signService;
	}


	@PostMapping("/signin")
	public JwtResponse authenticateUser(@RequestBody SignInRequest loginRequest) {
		return signService.signIn(loginRequest);
	}

	@PostMapping("/signup")
	public void signUp(@RequestBody RegisterRequest signUpRequest) {
		signService.signUp(signUpRequest);
	}
}