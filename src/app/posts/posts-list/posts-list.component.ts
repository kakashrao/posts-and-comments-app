import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "../posts.service";

import { Post } from "../post.model";

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
      this.getAllPosts();
    }

    postsList: Post[] = [];

  // postsList = [
  //   {
  //     userName: "Akash",
  //     userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
  //     userWork: "B.Tech Mechanical",
  //     postDesc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //     postImage: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg"
  //   },
  //   {
  //     userName: "Akash",
  //     userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
  //     userWork: "B.Tech Mechanical",
  //     postDesc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //     postImage: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg"
  //   },
  //   {
  //     userName: "Akash",
  //     userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
  //     userWork: "B.Tech Mechanical",
  //     postDesc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  //     postImage: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg"
  //   }
  // ]

  postLoading: boolean = false;
  getAllPosts() {
    this.postLoading = true;
    this._postsService.getAllPosts().subscribe((response: any) => {
      console.log(response);
      this.postsList = response.posts.map((element: {title: string, description: string}) => {
        return {
          title: element.title,
          description: element.description,
        }
      })

      this.postLoading = false;
    })
  }

  showPostDetails() {
    this._router.navigate(['/post']);
  }
}
