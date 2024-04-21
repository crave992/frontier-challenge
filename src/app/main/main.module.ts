import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component'; // Ensure this import is correct
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent // Make sure HomeComponent is declared here
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
