import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {tap} from "rxjs";

export default class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // limit to a specific url
    // if(req.url == 'example'){}
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'abc')
    });
    console.log("Request.....")
    return next.handle(modifiedRequest).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Response) {
        console.log("Response arrived");
        console.log('body: ', event.body)
      }
    }));
  }
}
