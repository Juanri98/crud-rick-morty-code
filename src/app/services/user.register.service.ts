import { Injectable } from '@angular/core';
import { UserRegister } from '../interfaces/user.register.interface';
import { environment } from '../../environments/environment';
import { createClient, PostgrestSingleResponse, User, UserResponse } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  private supabaseUrl = environment.supabaseApiURL;
  private supabaseKey = environment.supabaseApiKey;
  public supabase = createClient(this.supabaseUrl, this.supabaseKey);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.isAuthenticatedSubject.next(true);
      } else if (event === 'SIGNED_OUT') {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  async checkUserExistence(email: string, password: string): Promise<boolean> {
    try {
      await this.supabase.auth.signInWithPassword({ email, password });
      return true;
    } catch (error) {
      return false;
    }
  }

  signUp(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.supabase.auth.signUp({ email, password }).then(
        (response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response.data.user);
            observer.complete();
          }
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  insertUser(userRegister: UserRegister): Observable<PostgrestSingleResponse<any>> {
    return new Observable((observer) => {
      this.supabase
        .from('UserData')
        .upsert([
          {
            name: userRegister.name,
            last_name: userRegister.last_name,
            id_document: userRegister.id_document,
            email: userRegister.email,
          },
        ])
        .then(
          (response: PostgrestSingleResponse<any>) => {
            if (response.error) {
              observer.error(response.error);
            } else {
              observer.next(response);
              observer.complete();
            }
          },
          (error) => {
            observer.error(error);
          },
        );
    });
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.supabase.auth.signInWithPassword({ email, password }).then(
        (response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response.data.user);
            observer.complete();
          }
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  async logout() {
    try {
      await this.supabase.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  }

  getUser(): Promise<UserResponse> | null {
    return this.supabase.auth.getUser();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
