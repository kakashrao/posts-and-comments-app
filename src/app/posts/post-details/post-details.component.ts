import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { PostsService } from "../posts.service";

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(
    private _postService: PostsService,
    private _storageService: StorageService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      const postId = param['postId'];
      this.getPostDetails(postId);
    })
  }

  commentList = [
    {
      userName: "Akash",
      userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
      userWork: "B.Tech Mechanical",
      commentText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    }
  ]

  postData: any = {};

  showMoreDescription(flag: boolean) {
    this.postData.showFullText = flag;
  }

  postLoading: boolean = false;

  getPostDetails(postId: string) {
    this._postService.getPostDataByPostId(postId)
      .subscribe((response: any) => {
        this.postData = response.post;
      })
  }

  onPostComment(commentField: HTMLTextAreaElement) {
    console.log(commentField);

    let payload = {
      message: commentField,
      commentedOn: this.postData.postId,
      commentedBy: this._storageService.getFromLocalStorage('userId')
    }

    // this._postService.postComment(payload).subscribe({
    //   next: (response: any) => {

    //   }
    // })
  }
}
