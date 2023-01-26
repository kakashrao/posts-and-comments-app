import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      const postId = param['postId'];

      if (postId) {
        this.getPostDetails(postId);
      } else {
        this._router.navigate(['/posts']);
      }
    })

    this.userDetails.name = this._storageService.getFromLocalStorage('userName') || '';
    this.userDetails.image = this._storageService.getFromLocalStorage('userImage') || '';
    this.userDetails.profession = this._storageService.getFromLocalStorage('userProfession') || '';
  }

  commentList: any[] = [];

  userDetails = {
    name: '',
    image: '',
    profession: ''
  }
  postData: any = {};

  showMoreDescription(flag: boolean) {
    this.postData.showFullText = flag;
  }

  postLoading: boolean = false;

  getPostDetails(postId: string) {
    this.postLoading = true;

    this._postService.getPostDataByPostId(postId)
      .subscribe((response: any) => {
        this.postData = response.post;
        this.postLoading = false;
      })
  }

  commentLoading: boolean = false;

  onPostComment(commentField: HTMLTextAreaElement) {
    if (!commentField.value || this.commentLoading) {
      return;
    }

    this.commentLoading = true;

    let payload = {
      message: commentField.value,
      commentOn: this.postData.postId,
      commentBy: this._storageService.getFromLocalStorage('userId')
    }

    this._postService.postComment(payload).subscribe((response: any) => {

      this.commentList.push({
        commentId: response.commentId,
        userName: this.userDetails.name,
        userImg: this.userDetails.image,
        userProfession: this.userDetails.profession,
        message: commentField.value,
      })

      this.commentLoading = false;
    },
      (error) => {
        this.commentLoading = false;
      })
  }
}
