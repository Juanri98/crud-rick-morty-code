import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListRickMortyComponent } from './components/list-rick-morty/list-rick-morty.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { LogoutComponent } from './components/logout/logout.component';
import { MatSortModule } from '@angular/material/sort';
import { CharactersComponent } from './components/list-rick-morty/characters/characters.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../app/guardian/auth.guard';
import { CharactersFavComponent } from './components/characters-fav/characters-fav.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterRickMortyComponent } from './components/register-rick-morty/register-rick-morty.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        ListRickMortyComponent,
        FooterComponent,
        LogoutComponent,
        CharactersComponent,
        CharactersFavComponent,
        LoginComponent,
        RegisterRickMortyComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        MatSortModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        CoreModule,
        RouterModule,
        MatChipsModule,
        MatIconModule], providers: [AuthGuard, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
