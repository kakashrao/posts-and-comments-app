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
  postImages : any[] = [];

  ngOnInit() : void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl('', {
        validators: [ Validators.required ]
      }),
      images: new FormControl([], {
        validators: [Validators.required]
      })
    })
  }

  async onUploadImages(event: any) {
    // console.log(event);
    const files = event.target.files;
    this.form.patchValue({ images: files });
    this.form.get('images')?.updateValueAndValidity();
    // console.log(this.form.get('images'));


    let i = 0;
    for(let file of files) {
      await this.readUploadedFile(file)
      .then((result) => {
        // console.log("result", result);
        this.postImages[i] = result;
        i++;
      })
    }
    // console.log(this.postImages);
  }

  readUploadedFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.readAsDataURL(file);
      console.log(reader);
    })
  }

  createPost() {
    if (this.form?.invalid) {
      return;
    }

    const postData: Post = {
      postId: '',
      title: this.form.value.title,
      description: this.form.value.description,
      images: this.form.value.images
    }

    this._postService.createPost(postData).subscribe((response: any) => {
      console.log(response);
      this._postService.onPostCreated();
      this._router.navigate(['/posts']);
    })
  }
}
