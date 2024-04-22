import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataCardComponent } from './components/data-card/data-card.component';
import { DataCardReplyComponent } from './components/data-card-reply/data-card-reply.component';
import { RelativeTimePipe } from 'app/core/pipes/relative-time.pipe';

@NgModule({
  declarations: [
    DataCardComponent,
    DataCardReplyComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    DataCardComponent,
    DataCardReplyComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
