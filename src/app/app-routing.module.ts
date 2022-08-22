import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: 'posts', component: PostsListComponent },
  { path: 'create-post', component: PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
