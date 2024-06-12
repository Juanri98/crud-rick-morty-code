import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRickMortyRoutingModule } from './register-rick-morty-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RegisterRickMortyRoutingModule, SharedModule],
})
export class RegisterRickMortyModule {}
