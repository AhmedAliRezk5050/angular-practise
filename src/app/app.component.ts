import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PartialPost, Post} from "./post.module";
import PostsService from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;


  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createPost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isLoading = true;
      this.postsService.fetchPosts()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.loadedPosts = posts
      })
  }

  onClearPosts() {
    // Send Http request
  }
}



