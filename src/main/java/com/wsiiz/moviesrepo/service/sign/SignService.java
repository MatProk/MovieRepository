package com.wsiiz.moviesrepo.service.sign;

import com.wsiiz.moviesrepo.message.request.RegisterRequest;
import com.wsiiz.moviesrepo.message.request.SignInRequest;
import com.wsiiz.moviesrepo.message.response.JwtResponse;
import org.springframework.stereotype.Service;

@Service
public interface SignService {
    void signUp(RegisterRequest signUpRequest);

    JwtResponse signIn(SignInRequest signInRequest);
}
