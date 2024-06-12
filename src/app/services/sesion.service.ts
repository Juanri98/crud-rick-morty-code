import { Injectable } from '@angular/core';
import { UserAuth } from '../interfaces/user.auth.interface';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private user: UserAuth = {
    password: '',
    companyId: '',
    username: '',
    desdeMs: true,
    token: '',
  };

  setUser(user: UserAuth): void {
    this.user = user;
    this.saveStorage();
  }

  resetUser(): void {
    this.user = {
      password: '',
      companyId: '',
      username: '',
      desdeMs: true,
      token: '',
    };
    this.saveStorage();
  }

  constructor() {
    this.readStorage();
  }

  saveStorage(): void {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  readStorage(): void {
    if (sessionStorage.getItem('user')) {
      let datos = sessionStorage.getItem('user');
      this.user = JSON.parse(JSON.stringify(datos));
    }
  }
}
