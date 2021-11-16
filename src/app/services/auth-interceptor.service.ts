import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("access_token"));
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + accessToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
