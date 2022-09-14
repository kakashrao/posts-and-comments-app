import { APP_BOOTSTRAP_LISTENER, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { LandingService } from "../landing-console/landing.service";
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private _landingService: LandingService,
    private _storageService: StorageService,
    private _router: Router
  ) {}

  isAuthenticated: boolean = false;
  toastShow: boolean = false;
  userId: string | null = '';

  ngOnInit(): void {
    this._landingService.getCheckAuthSub().subscribe(() => {
        const userId = this._storageService.getUserId();

        if(userId) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
    })

    this._landingService.checkAuthentication();
  }

  checkAuth() {
    this.userId = this._storageService.getUserId();

    if(!this.userId) {
      this.toastShow = true;

      setTimeout(() => {
        this.toastShow = false;
      }, 2000)
    } else {
      this.toastShow = false;
    }
  }

  logoutUser() {
    this._storageService.clearAuthData();
    this.userId = null;

    this._landingService.checkAuthentication();
    this._router.navigate(['/posts']);
  }
}
