import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error-service.service';
import { RickMortyService } from 'src/app/services/rick.morty.service';
import { SupabaseService } from 'src/app/services/supabase-service.service';

@Component({
  selector: 'app-characters-fav',
  templateUrl: './characters-fav.component.html',
  styleUrls: ['./characters-fav.component.scss'],
})
export class CharactersFavComponent implements OnInit {
  data: any[] = [];
  favorites: string[] = [];
  isLoading = true;
  dataCharacters: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private errorService: ErrorService,
    private rickMortyService: RickMortyService,
  ) {}

  ngOnInit(): void {
    this.getFavoriteCharacters();
  }

  isFavorite(character: any): boolean {
    return this.favorites.includes(character.id);
  }

  getCharacters(characters: string) {
    this.dataCharacters = [];
    this.rickMortyService.getCharactersForEpisode(characters).subscribe({
      next: (response: any) => {
        if (response.length === undefined) {
          this.dataCharacters.push(response);
        } else {
          this.dataCharacters = JSON.parse(JSON.stringify(response));
        }
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
      .setFavoriteCharacters(JSON.parse(sessionStorage.getItem('user')!).id, this.favorites)
      .subscribe(
        (favorites) => {
          this.errorService.showMessage('Favoritos Actualizados satisfacotiramente.');
          this.getFavoriteCharacters();
        },
        (error) => {
          this.errorService.showMessage('Error al Actualizar Favoritos.');
        },
      );
  }

  getFavoriteCharacters(): void {
    this.supabaseService.getFavoriteCharacters(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
      (response) => {
        const { data } = JSON.parse(JSON.stringify(response));
        if (data.length > 0 && data[0].favorites.length > 0) {
          this.favorites = [...data[0].favorites];
          const favString = this.favorites.join(', ');
          this.getCharacters(favString);
        } else {
          this.favorites = [];
          this.dataCharacters = [];
        }
      },
      (error) => {
        this.errorService.showMessage(`Error al traer los favoritos: ${error.message}`);
      },
    );
  }
}
