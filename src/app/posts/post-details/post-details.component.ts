import { Component } from "@angular/core";

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  commentList = [
    {
      userName: "Akash",
      userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
      userWork: "B.Tech Mechanical",
      commentText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    }
  ]

  postData = {
      userName: "Akash",
      userImg: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg",
      userWork: "B.Tech Mechanical",
      postDesc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      postImage: "https://images.unsplash.com/photo-1661077731761-20d878c92341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg"
    }
}
