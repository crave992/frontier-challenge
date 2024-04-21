import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// You can also import and declare/export any shared components, directives, or pipes here

@NgModule({
  declarations: [
    // Add shared components, directives, and pipes here
  ],
  imports: [
    CommonModule // SharedModule imports CommonModule to use common directives
  ],
  exports: [
    // Components, directives, and pipes that you want to share
    CommonModule // Export CommonModule so you don't have to import it in other modules
  ]
})
export class SharedModule { }
