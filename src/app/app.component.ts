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
  isFetching = false;
  isLoading = false;
  fetchingError: string | null = null;


  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createPost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true;
      this.postsService.fetchPosts()
      .subscribe({
        next: (posts: Post[]) => {
          this.isFetching = false;
          this.loadedPosts = posts
          this.fetchingError = null;
        },
        error: error => {
          this.fetchingError = error.message
        }
      })
  }

  onClearPosts() {
    this.isLoading = true;
    this.postsService.deletePosts()
      .subscribe(() => {
        this.isLoading = false
        this.loadedPosts = [];
      })
  }
}



