import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: 'posts', component: PostsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
