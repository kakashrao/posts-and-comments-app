export interface Post {
  postId: string;
  title: string,
  description: string,
  images: [
    {
      url: string;
      fileName: string;
    }
  ]
}
