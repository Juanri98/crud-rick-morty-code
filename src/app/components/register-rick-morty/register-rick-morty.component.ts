import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserRegisterService } from '../../services/user.register.service';
import { ErrorService } from 'src/app/services/error-service.service';
import { UserRegister } from 'src/app/interfaces/user.register.interface';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-service.service';

@Component({
  selector: 'app-register-rick-morty',
  templateUrl: './register-rick-morty.component.html',
  styleUrls: ['./register-rick-morty.component.scss'],
})
export class RegisterRickMortyComponent implements OnInit {
  hide = true;
  isLoading = true;
  error: boolean = false;
  messageError!: string;

  createUserForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    id_document: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get name(): AbstractControl | null {
    const control = this.createUserForm.get('name');
    return control !== null ? control : null;
  }
  get last_name(): AbstractControl | null {
    const control = this.createUserForm.get('last_name');
    return control !== null ? control : null;
  }
  get id_document(): AbstractControl | null {
    const control = this.createUserForm.get('id_document');
    return control !== null ? control : null;
  }
  get email(): AbstractControl | null {
    const control = this.createUserForm.get('email');
    return control !== null ? control : null;
  }
  get password(): AbstractControl | null {
    const control = this.createUserForm.get('password');
    return control !== null ? control : null;
  }

  constructor(
    private userRegisterService: UserRegisterService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private router: Router,
    private supabaseService: SupabaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.userRegisterService.supabase.auth.getUser();
    if (user.data.user) {
      this.router.navigate(['/home']);
    }
  }

  createUser() {
    this.isLoading = false;
    this.userRegisterService.signUp(this.email?.value, this.password?.value).subscribe(
      (user) => {
        this.isLoading = true;
        this.errorService.showMessage(
          `Usuario registrado: ${JSON.stringify(user.email)}, por favor confirmar su correo.`,
        );
        this.insertDataRow(this.email?.value, this.password?.value);
      },
      (error) => {
        this.isLoading = true;
        this.error = true;
        this.messageError = error.message;
        this.errorService.showMessage(`Error al registrar usuario: ${error.message}`);
      },
    );
  }

  insertDataRow(emailToCheck: string, password: string): void {
    this.userRegisterService
      .checkUserExistence(emailToCheck, password)
      .then((exists) => {
        if (exists) {
          const formData = this.createUserForm.value as UserRegister;
          this.userRegisterService.insertUser(formData).subscribe(
            () => {
              this.errorService.showMessage('Datos del usuario registrados.');
              this.router.navigate(['/login']);
            },
            (error) => {
              this.errorService.showMessage(`Error al registrar datos del usuario: ${error.message}`);
            },
          );
        }
      })
      .catch((error) => {
        console.error('Error al verificar la existencia del usuario:', error);
      });
  }

  emailExists(): void {
    this.isLoading = false;
    this.supabaseService.emailExists(this.email?.value).subscribe((exists: boolean) => {
      if (!exists) {
        this.createUser();
      } else {
        this.isLoading = true;
        this.error = true;
        this.messageError = `Error el correo que intenta registrar ${this.email?.value} ya existe.`;
        this.errorService.showMessage(this.messageError);
      }
    });
  }
}
