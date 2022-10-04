import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export default class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // limit to a specific url
    // if(req.url == 'example'){}

    console.log("Request.....")
    return next.handle(req);
  }
}
