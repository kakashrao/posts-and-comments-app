import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _storageService : StorageService,
    private _router : Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userId = this._storageService.getUserId();

    if(state.url === '/create-post') {
      if(!userId) {
        this._router.navigate(['/posts']);
        return false;
      }
    } else if(state.url === '/signup' || state.url === '/login') {
      if(userId) {
        this._router.navigate(['/posts']);
        return false;
      }
    }

    return true;
  }
}
