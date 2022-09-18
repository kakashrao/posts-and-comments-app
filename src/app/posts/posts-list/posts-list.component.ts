import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "../posts.service";

import { Post } from "../post.model";
import { map } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { LandingService } from "src/app/landing-console/landing.service";

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  constructor(
    private _router: Router,
    private _postsService: PostsService,
    private _storageService: StorageService,
    private _landingService: LandingService
  ) {}

  ngOnInit(): void {
    this._postsService.getPostCreatedObs().subscribe((isPostCreated: boolean) => {
      this.isPostCreated = isPostCreated;
    })

    this._landingService.getCheckAuthSub().subscribe(() => {
      this.getUserDetails();
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
    this._postsService.getAllPosts().subscribe((response: any) => {
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
        // console.log(error);
      },
      () => {
        this.getAllPosts();
      })
    } else {
      this.userDetails = null;
      this.getAllPosts();
    }
  }

  onEditPost(postId : string) {
    this._router.navigate([`/create-post/${postId}`]);
  }

  onDeletePost(postId: string) {
    this.postLoading = true;
    this._postsService.deletePost(postId).subscribe((response: any) => {
      this.getAllPosts();
    },
    error => {
      this.postLoading = false;
    }
    )
  }

  showMoreDescription(post: any, flag: boolean) {
    post.showFullText = flag;
  }

  showPostDetails(post:any) {
    this._router.navigate([`/post/${post.postId}`]);
  }
}
