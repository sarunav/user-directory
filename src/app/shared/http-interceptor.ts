import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.sharedService.showLoader();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            setTimeout(() => {
              this.sharedService.hideLoader();
            }, 1000);
          }
        },
        (err: any) => {
          this.sharedService.hideLoader();
        }
      )
    );
  }
}
