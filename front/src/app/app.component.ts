import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[];
  private authority: string;
  token;
  user;
 
  constructor(private router: Router, private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.token = this.tokenStorage.getToken();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
      this.userService.getUser().subscribe(data => this.user = data)
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
