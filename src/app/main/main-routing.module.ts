import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Adjust the import path as necessary

const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Set HomeComponent as the default component for this module
  }
  // You can add more routes here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
