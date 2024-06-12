import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserFavCharacter } from '../interfaces/user.fav.character.interface';
import { SesionService } from './sesion.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersFavService {

  constructor(private httpClient:HttpClient, private sesionService:SesionService) { 
  }

  obtenerFavoritos(){
    console.log('entra a service favorites',this.sesionService.getUser().token)
    const peticion = `${environment.apis[2]}api/favoritos`

    const headers:HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+this.sesionService.getUser().token
    })

    return this.httpClient.get(peticion,{ headers })
                          .pipe(map((data:any)=>{
      return data;
    }));

  }

  agregarFavoritos(userFav:UserFavCharacter){
    console.log('data',userFav)
    const peticion = `${environment.apis[2]}api/favoritos`

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset="utf-8"',
      'Authorization': 'Bearer '+this.sesionService.getUser().token
    })

    return this.httpClient.post(peticion, userFav, { headers })
                          .pipe(map((data:any)=>{
      return data;
    }));

  }
}
