import { Component, OnInit } from '@angular/core';
import { RickMortyService } from 'src/app/services/rick.morty.service';
import { SesionService } from 'src/app/services/sesion.service';
import { ActivatedRoute } from '@angular/router';
import { UserRegisterService } from 'src/app/services/user.register.service';
import { SupabaseService } from 'src/app/services/supabase-service.service';
import { ErrorService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  data: any[] = [];
  dataCharacters: any[] = [];
  favorites: string[] = [];
  isLoading = true;
  id: any;

  constructor(
    private rickMortyService: RickMortyService,
    private activatedRoute: ActivatedRoute,
    private supabaseService: SupabaseService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEpisode(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.getFavCharacteres();
  }

  getEpisode(id: string) {
    this.rickMortyService.getEpisode(id).subscribe({
      next: (response: any) => {
        let urlData: Array<any> = [];
        this.data = JSON.parse(JSON.stringify(response.characters));
        this.data.forEach((id: any) => {
          const lastItem = id.substring(id.lastIndexOf('/') + 1);
          urlData.push(lastItem);
        });
        this.getCharacters(urlData.toString());
      },
      error: (error: any) => {
        let user = JSON.parse(JSON.stringify(error));
      },
      complete: () => {},
    });
  }

  getCharacters(characters: string) {
    this.rickMortyService.getCharactersForEpisode(characters).subscribe({
      next: (response: any) => {
        this.dataCharacters = JSON.parse(JSON.stringify(response));
      },
      error: (error: any) => {
        let user = JSON.parse(JSON.stringify(error));
      },
      complete: () => {},
    });
  }

  toggleFavorite(character: any): void {
    if (this.isFavorite(character)) {
      this.favorites = this.favorites.filter((id) => id !== character.id);
    } else {
      this.favorites.push(character.id);
    }
    this.supabaseService
      .setFavoriteCharacters(JSON.parse(sessionStorage.getItem('user')!).id, this.favorites) // Supongamos que el ID de usuario se encuentra en this.user.id
      .subscribe(
        (favorites) => {
          this.errorService.showMessage('Favoritos Actualizados satisfacotiramente.');
        },
        (error) => {
          this.errorService.showMessage('Error al Actualizar Favoritos.');
        },
      );
  }

  isFavorite(character: any): boolean {
    return this.favorites.includes(character.id);
  }

  getFavCharacteres(): void {
    this.isLoading = false;
    this.supabaseService.getFavoriteCharacters(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
      (response) => {
        const data = JSON.parse(JSON.stringify(response));
        if (data.data.length > 0) {
          this.favorites = data.data[0].favorites;
        } else {
          this.favorites = [];
        }
        this.isLoading = true;
      },
      (error) => {
        this.isLoading = true;
        this.errorService.showMessage(`Error al traer los favoritos: ${error.message}`);
      },
    );
  }
}
