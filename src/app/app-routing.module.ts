import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameListComponent } from './components/name-list/name-list.component';

const routes: Routes = [
  { path: 'name-list', component: NameListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
