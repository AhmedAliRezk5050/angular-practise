import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PartialPost, Post} from "./post.module";
import PostsService from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  isLoading = false;
  fetchingError: string | null = null;
  error: string | null = null;
  errorObsSubscription?: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.onFetchPosts()
    this.errorObsSubscription = this.postsService.errorObs.subscribe(m => this.error = m);
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
      .subscribe(res => {
        console.log(res)
        this.isLoading = false
        this.loadedPosts = [];
      })
  }

  ngOnDestroy(): void {
    this.errorObsSubscription?.unsubscribe();
  }
}



