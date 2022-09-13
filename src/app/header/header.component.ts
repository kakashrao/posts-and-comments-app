import { Component, OnInit } from "@angular/core";
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
    private _storageService: StorageService
  ) {}

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this._landingService.getCheckAuthSub().subscribe(() => {
        const userId = this._storageService.getUserId();

        if(userId) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
    })

    const userId = this._storageService.getUserId();

    if(userId) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logoutUser() {
    this._storageService.removeFromLocalStorage('userId');
    this._storageService.removeFromLocalStorage('userName');
    this._storageService.removeFromLocalStorage('token');

    this._landingService.checkAuthentication();
  }
}
