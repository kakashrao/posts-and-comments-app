import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LandingService } from "../landing-console/landing.service";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _storageService: StorageService,
    private _router: Router,
    private _landingService: LandingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._storageService.getFromLocalStorage('token');

    if (token) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      })

      return next.handle(authRequest)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            // console.log("error" ,error);
            if (error.status === 401) {
              this._storageService.clearAuthData();
              this._router.navigate(['/login']);
            }

            const newError = error.error.message;

            return throwError(newError);
          })
        )
    } else {

      return next.handle(req)
        .pipe(
          catchError((error: HttpErrorResponse) => {

            const newError = error.error.message;

            return throwError(newError);
          })
        )
    }
  }
}
