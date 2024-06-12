import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../../services/user.register.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SesionService } from 'src/app/services/sesion.service';
import { ErrorService } from '../../services/error-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading = true;
  error: boolean = false;
  messageError!: string;

  formulario = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get username(): AbstractControl | null {
    const control = this.formulario.get('username');
    return control !== null ? control : null;
  }

  get password(): AbstractControl | null {
    const control = this.formulario.get('password');
    return control !== null ? control : null;
  }

  constructor(
    private userRegisterService: UserRegisterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sesionService: SesionService,
    private errorService: ErrorService,
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.userRegisterService.supabase.auth.getUser();
    if (user.data.user) {
      this.router.navigate(['/home']);
    }
  }

  verificarDatos(): any {
    this.error = false;
    this.isLoading = false;
    this.userRegisterService.login(this.username!.value, this.password!.value).subscribe({
      next: (response: any) => {
        let user = JSON.parse(JSON.stringify(response));
        this.error = false;
        this.sesionService.setUser(user);
        this.isLoading = true;
        this.router.navigate(['/home']);
      },
      error: (errors: any) => {
        let error = JSON.parse(JSON.stringify(errors));
        this.isLoading = true;
        this.sesionService.resetUser();
        this.error = true;
        this.messageError = `Error: ${error.message}`;
        this.errorService.showMessage(this.messageError);
      },
      complete: () => {},
    });
  }
}
