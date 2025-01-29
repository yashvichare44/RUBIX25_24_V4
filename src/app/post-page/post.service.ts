import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Array<any> = [];

  getPosts() {
    return this.posts;
  }

  addPost(post: any) {
    this.posts.push(post);
  }
}