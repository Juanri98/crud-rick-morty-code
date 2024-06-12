import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/list-rick-morty/characters/characters.component';
import { ListRickMortyComponent } from './components/list-rick-morty/list-rick-morty.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from '../app/guardian/auth.guard';
import { CharactersFavComponent } from './components/characters-fav/characters-fav.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register-rick-morty/register-rick-morty.module').then((m) => m.RegisterRickMortyModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: 'favorites', component: CharactersFavComponent, data: { breadcrumb: 'Favoritos' } },
      {
        path: 'episodes',
        component: ListRickMortyComponent,
        data: { breadcrumb: 'Episodios' },
        children: [
          {
            path: 'characters/:id',
            component: CharactersComponent,
            data: { breadcrumb: 'Personajes' },
          },
        ],
      },
    ],
  },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
