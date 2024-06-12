import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error-service.service';
import { UserRegisterService } from '../services/user.register.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userRegisterService: UserRegisterService,
    private router: Router,
    private errorService: ErrorService,
  ) {}
  próximaRuta: string | null = null;

  async canActivate(): Promise<boolean> {
    try {
      const user = await this.userRegisterService.supabase.auth.getUser();
      if (user.data.user) {
        return true;
      } else {
        const currentUrl = this.router.url;
        const isLoggingOut = currentUrl.includes('/logout');

        if (isLoggingOut) {
          this.router.navigate(['/login']);
        } else {
          this.errorService.showMessage('No tiene permisos');
          this.router.navigate(['/login']);
        }
        return false;
      }
    } catch (error: any) {
      this.errorService.showMessage(`Error al obtener el usuario autenticado: ${error.message}`);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
