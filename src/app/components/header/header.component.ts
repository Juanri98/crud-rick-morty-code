import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from 'src/app/services/user.register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean | void = false;
  email: string | null = null;

  constructor(private userRegisterService: UserRegisterService) {}

  ngOnInit(): void {
    this.userRegisterService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        setTimeout(() => {
          this.email = JSON.parse(sessionStorage.getItem('user')!).email;
        });
      }
    });
  }
}
