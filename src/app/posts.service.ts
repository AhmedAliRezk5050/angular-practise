import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PartialPost, Post} from "./post.module";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export default class PostsService {

  private url = 'https://angular-practise-caf1f-default-rtdb.firebaseio.com/posts.json'

  constructor(private http: HttpClient) {
  }

  createPost(title: string, content: string) {
    this.http.post<{name : string}>(this.url, {title, content})
      .subscribe(res => console.log(res))
  }

  fetchPosts() {
    return this.http.get<{ [k: string]: PartialPost }>(this.url)
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
}
