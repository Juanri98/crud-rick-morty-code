import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from 'src/app/services/user.register.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private userRegisterService: UserRegisterService) {
    this.userRegisterService.logout();
    sessionStorage.removeItem('user');
  }

  ngOnInit(): void {}
}
