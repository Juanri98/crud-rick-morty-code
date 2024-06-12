import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  peticion = `${environment.apis[0]}episode`;
  constructor(private httpClient: HttpClient) {}

  getEpisodes(): Observable<any[]> {
    return this.httpClient.get(this.peticion).pipe(
      map((initialResponse: any) => initialResponse.info.pages),
      mergeMap((totalPages: number) => {
        const requests: Observable<any[]>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getEpisodesByPage(page));
        }
        return forkJoin(requests);
      }),
    );
  }

  private getEpisodesByPage(page: number): Observable<any[]> {
    const url = `${this.peticion}?page=${page}`;
    return this.httpClient.get<any[]>(url);
  }

  getEpisode(id: string) {
    const peticion = `${environment.apis[0]}episode/${id}`;
    return this.httpClient.get(peticion).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }

  getCharactersForEpisode(characters: string) {
    const peticion = `${environment.apis[0]}character/${characters}`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset="utf-8"',
    });
    return this.httpClient.get(peticion, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
    );
  }
}
