import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = environment.supabaseApiURL;
  private supabaseKey = environment.supabaseApiKey;
  public supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() {}

  emailExists(email: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.supabase
        .from('UserData')
        .select('email')
        .eq('email', email)
        .then(({ data, error }) => {
          if (error) {
            observer.error(`Error al consultar los emails: ${error.message}`);
          } else {
            observer.next(data.length > 0);
            observer.complete();
          }
        });
    });
  }

  getFavoriteCharacters(user: string): Observable<PostgrestSingleResponse<any>> {
    return new Observable((observer) => {
      this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user)
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

  setFavoriteCharacters(user: string, favorites: string[]): Observable<void> {
    return new Observable<void>((observer) => {
      this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user)
        .then(
          async ({ data, error }) => {
            if (error) {
              observer.error(`Error al consultar la tabla: ${error.message}`);
            } else if (data.length === 0) {
              const { data: nuevoRegistro, error: errorCreacion } = await this.supabase.from('favorites').upsert([
                {
                  user_id: user,
                  favorites: favorites,
                },
              ]);

              if (errorCreacion) {
                observer.error(`Error al crear el registro: ${errorCreacion.message}`);
              } else {
                observer.next();
                observer.complete();
              }
            } else {
              const registroExistente = data[0];
              const { data: registroActualizado, error: errorActualizacion } = await this.supabase
                .from('favorites')
                .update({
                  favorites: favorites,
                })
                .eq('user_id', user);

              if (errorActualizacion) {
                observer.error(`Error al actualizar el registro: ${errorActualizacion.message}`);
              } else {
                observer.next();
                observer.complete();
              }
            }
          },
          (error) => {
            observer.error(`Error al consultar la tabla: ${error.message}`);
          },
        );
    });
  }
}
