import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  userName = "";
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.userName = this.tokenStorage.getUsername();
      return this.router.navigateByUrl('/home')
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.tokenStorage.loggedIn.emit(true);
          this.roles = this.tokenStorage.getAuthorities();
          //return this.router.navigateByUrl('/home')
          this.reloadPage();
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
