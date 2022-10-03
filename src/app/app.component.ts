import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {PartialPost, Post} from "./post.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/posts.json'

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name : string}>(this.url, postData)
      .subscribe(res => console.log(res))
  }

  onFetchPosts() {
    this.isLoading = true;
    this.http.get<{[k: string] : PartialPost}>(this.url)
      .pipe(map(data => {
        const posts: Post[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            posts.push({...data[key], id: key})
          }
        }
        return posts;
      }))
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.loadedPosts = posts
      })
  }

  onClearPosts() {
    // Send Http request
  }
}



