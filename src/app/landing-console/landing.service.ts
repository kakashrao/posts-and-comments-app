import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private checkAuth = new Subject<void>();

  checkAuthentication() {
    this.checkAuth.next();
  }

  getCheckAuthSub() {
    return this.checkAuth.asObservable();
  }
}
