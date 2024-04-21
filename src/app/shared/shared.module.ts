import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataCardComponent } from './components/data-card/data-card.component';

@NgModule({
  declarations: [
    DataCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    DataCardComponent,
    MatCardModule,
    MatButtonModule
  ]
})
export class SharedModule { }
