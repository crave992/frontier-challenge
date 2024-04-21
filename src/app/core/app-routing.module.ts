import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('../main/main.module').then(m => m.MainModule)  // Verify path and lazy loading syntax
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' }  // Redirects to /main as default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
