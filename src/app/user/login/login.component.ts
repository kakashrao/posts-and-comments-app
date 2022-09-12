import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LandingService } from "src/app/landing-console/landing.service";
import { StorageService } from "src/app/services/storage.service";
import { UserService } from "../user.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _storageService: StorageService,
    private _landingService: LandingService,
  ) {}

  isLoading: boolean = false;

  onLogin(loginForm: NgForm) {
    if(!loginForm.valid) {
      return;
    }

    console.log(loginForm);

    this.isLoading = true;

    const userData = {
      email: loginForm.value.userEmail,
      password: loginForm.value.userPassword
    }

    this._userService.loginUser(userData).subscribe((response: any) => {

      this._storageService.setUserId(response.userData.id);
      this._storageService.setUserName(response.userData.name);
      this._storageService.setUserProfession(response.userData.profession);
      this._storageService.setUserBio(response.userData.bio);
      this._storageService.setToken(response.userData.token);

      this._landingService.checkAuthentication();

      this._router.navigate(['/posts']);
    },
    error => {
      this.isLoading = false;
      console.log(error);
    })
  }
}
