import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private postCreated = new Subject<boolean>();

  onPostCreated() {
    this.postCreated.next(true);
  }

  getPostCreatedObs() {
    return this.postCreated.asObservable();
  }

  // Post related api's

  createPost(postData: FormData) {
    return this.http.post(environment.baseUrl + '/posts', postData);
  }

  updatePost(postData: FormData, postId: string) {
    return this.http.put(environment.baseUrl + `/posts/${postId}`, postData);
  }

  deletePost(postId: string) {
    return this.http.delete(environment.baseUrl + `/posts/${postId}`);
  }

  getAllPosts() {
    return this.http.get(environment.baseUrl + '/posts');
  }

  getPostDataByPostId(postId: string) {
    return this.http.get(environment.baseUrl + `/posts/${postId}`);
  }

  // User related api's

  getUserDataByUserId(userId: string | null) {
    return this.http.get(environment.baseUrl + `/user/${userId}`);
  }

  // Comments related api's

  postComment(payload: any) {
    return this.http.post(
      environment.baseUrl + `/comment`, payload
    )
  }
}
