import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRickMortyComponent } from './register-rick-morty.component';

const routes: Routes = [{ path: '', component: RegisterRickMortyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRickMortyRoutingModule {}
