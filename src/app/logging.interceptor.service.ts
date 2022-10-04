import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export default class LoggingInterceptorService implements  HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request from the second interceptor')
    console.log(req.headers)
    return next.handle(req);
  }
}
