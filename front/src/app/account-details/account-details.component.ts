import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  user;
  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => this.user = data)
  }

}
