import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {

  constructor(
    private _postService: PostsService,
    private _router : Router,
    private _storageService: StorageService
  ) {}

  form: FormGroup = new FormGroup({})
  postImages : any[] = [];

  ngOnInit() : void {
    const userId = this._storageService.getUserId();

    if(!userId) {
      this._router.navigate(['/posts']);
      return;
    }

    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl('', {
        validators: [ Validators.required ]
      }),
      images: new FormControl([])
    })
  }

  files: any[] = [];
  async onUploadImages(event: any) {
    this.files = event.target.files;
    this.form.patchValue({ images: this.files });
    this.form.get('images')?.updateValueAndValidity();
    // console.log(this.form.get('images'));

    for(let file of this.files) {
      await this.readUploadedFile(file)
      .then((result) => {
        // console.log("result", result);
        this.postImages.push(result);
      })
    }
    console.log(this.postImages);
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

  isLoading: boolean = false;
  async createPost() {
    if (this.form?.invalid) {
      return;
    }

    this.isLoading = true;

    const formData = new FormData();

    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);

    Object.values(this.form.value.images).forEach((image: any) => {
      formData.append('images', image);
    });

    this._postService.createPost(formData).subscribe((response: any) => {
      console.log(response);
      this._postService.onPostCreated();
      this._router.navigate(['/posts']);
      this.isLoading = false;
    },
     error => {
      this.isLoading = false;
    })
  }
}
