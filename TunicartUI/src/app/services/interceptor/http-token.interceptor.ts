import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';
import { AuthenticationService } from '../services';
import { refreshToken } from '../fn/authentication/refresh-token';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(
      private tokenService: TokenService
    ) {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.tokenService.accessToken;
      if (token) {
        const authReq = request.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
      return next.handle(request);
    }
  }
  
  