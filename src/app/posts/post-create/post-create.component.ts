import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    private _router: Router,
    private _storageService: StorageService,
    private _route: ActivatedRoute
  ) { }

  form: FormGroup = new FormGroup({})
  postImages: any[] = [];
  postId: string = '';

  ngOnInit(): void {
    const userId = this._storageService.getFromLocalStorage('userId');

    if (!userId) {
      this._router.navigate(['/posts']);
      return;
    }

    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      images: new FormControl([])
    })

    this._route.params.subscribe((params: any) => {
      if (params['postId']) {
        this.postId = params['postId'];
        this.getPostDetails();
      }
    })
  }

  sendingFileList: any[] = [];
  async onUploadImages(event: any) {
    let files = event.target.files;

    Object.values(files).forEach((file: any) => {
      this.sendingFileList.push(file);
    })
    this.form.patchValue({ images: files });
    this.form.get('images')?.updateValueAndValidity();

    for (let file of files) {
      await this.readUploadedFile(file)
        .then((result) => {
          // console.log("result", result);
          this.postImages.push(result);
        })
    }
  }

  readUploadedFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.readAsDataURL(file);
    })
  }

  deleteImagesList: any[] = [];

  deletePostImage(index: number) {
    let image = this.sendingFileList[index];

    if (image?.url ? image.url : false) {
      this.deleteImagesList.push(image.fileName);
    }
    this.postImages.splice(index, 1);
    this.sendingFileList.splice(index, 1);
    // this.form.value.images.splice(index, 1);
  }

  getPostDetails() {
    this._postService.getPostDataByPostId(this.postId).subscribe((response: any) => {
      const postData = response.post;

      this.postImages = postData.images.map((image: any) => {
        return image.url;
      })

      postData.images.forEach((image: any) => {
        this.sendingFileList.push(image);
      })

      this.form.setValue({
        title: postData.title,
        description: postData.description,
        images: []
      });
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

    Object.values(this.form.value.images).forEach((file: any) => {
      formData.append('images', file);
    })

    this._postService.createPost(formData).subscribe((response: any) => {
      this._postService.onPostCreated();
      this._router.navigate(['/posts']);
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
      })
  }

  async updatePost() {
    if (this.form?.invalid) {
      return;
    }

    this.isLoading = true;

    const formData = new FormData();

    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);

    formData.append('deleteImages', JSON.stringify(this.deleteImagesList));

    Object.values(this.form.value.images).forEach((file: any) => {
      formData.append('images', file);
    })

    this._postService.updatePost(formData, this.postId).subscribe((response: any) => {
      this._router.navigate(['/posts']);
    },
      error => {
        this.isLoading = false;
      })
  }
}
