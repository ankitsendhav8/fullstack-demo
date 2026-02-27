import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';
import { APP_CONSTANTS } from '../constants/app.constant';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  public token: string = '';
  public serviceUrl: string = 'http://localhost:3000/';
  private readonly excludedEndpoints: string[] = ['/login', '/signup'];

  constructor(
    private userService: UserService,
    private localstorageService: LocalstorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const regExp = new RegExp(/assets/g, 'i');
    let newReq;
    /* Exclude login and signup api url and for other url setting up header and add a token to send in API  */
    if (!this.isExcludedEndpoint(request.url)) {
      const token = this.localstorageService.getDetail(
        APP_CONSTANTS.AUTH_TOKEN
      );

      newReq = request.clone({
        url: regExp.test(request.url)
          ? request.url
          : `${this.serviceUrl}${request.url}`,
          
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      /* Login and signup api */
      newReq = request.clone({
        url: regExp.test(request.url)
          ? request.url
          : `${this.serviceUrl}${request.url}`,
      });
    }

    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            /* do stuff with response if you want*/
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            /* Handle error here */
            if (err.status === 400) {
              this.userService.logout();
            }
          }
          return observableThrowError(
            new Error('Internal server error occurred!')
          );
        }
      )
    );
  }
  /* Checking which paths need to exclude  */
  private isExcludedEndpoint(url: string): boolean {
    return this.excludedEndpoints.some((endpoint) => url.endsWith(endpoint));
  }
}
