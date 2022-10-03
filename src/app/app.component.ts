import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/posts.json'

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.url, postData)
      .subscribe(res => console.log(res))
  }

  onFetchPosts() {
    this.http.get(this.url)
      .pipe(map((data: { [s: string]: any }) => {
        const posts: Post[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            posts.push({...data[key], id: key})
          }
        }
        return posts;
      }))
      .subscribe((posts: Post[]) => this.loadedPosts = posts)
  }

  onClearPosts() {
    // Send Http request
  }
}

interface Post {
  id: string;
  title: string;
  content: string;
}
