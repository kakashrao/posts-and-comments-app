import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  private postCreated = new BehaviorSubject<boolean>(false);

  onPostCreated() {
    this.postCreated.next(true);
  }

  getPostCreatedObs() {
    return this.postCreated.asObservable();
  }

  createPost(postData: FormData) {
    return this.http.post(environment.baseUrl + '/posts', postData)
  }

  getAllPosts() {
    return this.http.get(environment.baseUrl + '/posts');
  }
}
