import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {PartialPost, Post} from "./post.model";
import {map, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class PostsService {

  errorObs = new Subject<string | null>()

  private url = 'https://angular-practise2-de213-default-rtdb.firebaseiod.com/posts.json'

  constructor(private http: HttpClient) {
  }

  createPost(title: string, content: string) {
    this.http.post<{ name: string }>(this.url, {title, content},
      {
        observe: 'response'
      })
      .subscribe({
        next: res => {
          this.errorObs.next(null);
          console.log(res)
        },
        error: err => this.errorObs.next(err.message)
      })
  }

  fetchPosts() {
    let params = new HttpParams();
    params = params.append('print', 'pretty');

    return this.http.get<{ [k: string]: PartialPost }>(this.url, {
      headers: new HttpHeaders({'custom-header': 'hello'}),
      // params: new HttpParams().set('print', 'pretty')
      params: params,
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
    return this.http.delete(this.url, {
      observe: 'events',
      responseType: 'text'
    })
      .pipe(tap(event => {
        if(event.type === HttpEventType.Sent) {
          console.log('sent')
        }

        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }))
  }
}
