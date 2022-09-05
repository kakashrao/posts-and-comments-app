import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {

  constructor(private _postService: PostsService, private _router : Router) {}

  form: FormGroup = new FormGroup({})
  postImages = [];

  ngOnInit() : void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl('', {
        validators: [ Validators.required ]
      })
    })
  }

  createPost() {
    if (this.form?.invalid) {
      return;
    }

    const postData: Post = {
      postId: '',
      title: this.form.value.title,
      description: this.form.value.description
    }

    this._postService.createPost(postData).subscribe((response: any) => {
      console.log(response);
      this._postService.onPostCreated();
      this._router.navigate(['/posts']);
    })
  }
}
