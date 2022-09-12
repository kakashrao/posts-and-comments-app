import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "../posts.service";

import { Post } from "../post.model";
import { map } from "rxjs";
import { StorageService } from "src/app/services/storage.service";

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  constructor(
    private _router: Router,
    private _postsService: PostsService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._postsService.getPostCreatedObs().subscribe((isPostCreated: boolean) => {
      this.isPostCreated = isPostCreated;
    })

    setTimeout(() => {
      this.isPostCreated = false;
    }, 1000)

    this.getUserDetails();
  }

  isPostCreated: boolean = false;
  postsList: any[] = [];
  userDetails: any = null;

  postLoading: boolean = false;
  getAllPosts() {
    this._postsService.getAllPosts().pipe(map((postData : any) => {
      return {
        posts: postData.posts.map((element: { _id: string; title: string; description: string; images: any }) => {
          return {
            postId: element._id,
            title: element.title,
            description: element.description,
            images: element.images
          }
        })
      }
    })).subscribe((response: any) => {
      console.log(response);
      this.postsList = response.posts;

      this.postLoading = false;
    }, error => {
      this.postLoading = false;
    })
  }

  getUserDetails() {
    const userId = this._storageService.getUserId();

    this.postLoading = true;

    if(userId) {
      this._postsService.getUserDataByUserId(userId).subscribe((response: any) => {
        this.userDetails = response.userData;
      },
      error => {
        console.log(error);
      },
      () => {
        this.getAllPosts();
      })
    } else {
      this.getAllPosts();
    }
  }

  showMoreDescription(post: any, flag: boolean) {
    post.showFullText = flag;
  }

  showPostDetails(post:any) {
    this._router.navigate([`/post/${post.postId}`]);
  }
}
