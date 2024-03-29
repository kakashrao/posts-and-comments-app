import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LandingService } from "src/app/landing-console/landing.service";
import { StorageService } from "src/app/services/storage.service";
import { UserService } from "../user.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _storageService: StorageService,
    private _landingService: LandingService,
  ) { }

  ngOnInit(): void {
    const userId = this._storageService.getFromLocalStorage('userId');

    if (userId) {
      this._router.navigate(['/posts']);
      return;
    }
  }

  hide: boolean = true;

  showHidePassword() {
    this.hide = !this.hide;
  }

  isLoading: boolean = false;

  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    this.isLoading = true;

    const userData = {
      email: loginForm.value.userEmail,
      password: loginForm.value.userPassword
    }

    this._userService.loginUser(userData).subscribe((response: any) => {

      this._storageService.setInLocalStorage('userId', response.userData.id);
      this._storageService.setInLocalStorage('userName', response.userData.name);
      this._storageService.setInLocalStorage('userProfession', response.userData.profession);
      this._storageService.setInLocalStorage('userBio', response.userData.bio);
      this._storageService.setInLocalStorage('userImage', response.userData.imageUrl);
      this._storageService.setInLocalStorage('token', response.userData.token);

      this._landingService.checkAuthentication();

      this._router.navigate(['/posts']);
    },
      error => {
        this.isLoading = false;
      })
  }
}
