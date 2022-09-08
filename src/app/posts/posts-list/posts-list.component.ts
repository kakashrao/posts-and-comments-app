import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "../posts.service";

import { Post } from "../post.model";
import { map } from "rxjs";

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  constructor(
    private _router: Router,
    private _postsService: PostsService
  ) {}

  ngOnInit(): void {
    this._postsService.getPostCreatedObs().subscribe((isPostCreated: boolean) => {
      this.isPostCreated = isPostCreated;
    })

    setTimeout(() => {
      this.isPostCreated = false;
    }, 1000)

    this.getAllPosts();
  }

  isPostCreated: boolean = false;
  postsList: any[] = [];

  postLoading: boolean = false;
  getAllPosts() {
    this.postLoading = true;
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

  showMoreDescription(post: any, flag: boolean) {
    post.showFullText = flag;
  }

  showPostDetails(post:any) {
    this._router.navigate([`/post/${post.postId}`]);
  }
}
