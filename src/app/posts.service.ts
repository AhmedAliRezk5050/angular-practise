import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PartialPost, Post} from "./post.module";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class PostsService {

  errorObs = new Subject<string | null>()

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/posts.json'

  constructor(private http: HttpClient) {
  }

  createPost(title: string, content: string) {
    this.http.post<{name : string}>(this.url, {title, content})
      .subscribe({
        next: res => {
          this.errorObs.next(null);
          console.log(res)
        },
        error: err => this.errorObs.next(err.message)
      })
  }

  fetchPosts() {
    return this.http.get<{ [k: string]: PartialPost }>(this.url, {
      headers: new HttpHeaders({'custom-header': 'hello'})
    })
      .pipe(map(data => {
        const posts: Post[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            posts.push({...data[key], id: key})
          }
        }
        return posts;
      }))
  }

  deletePosts() {
    return this.http.delete(this.url)
  }
}
