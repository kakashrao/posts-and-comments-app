import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LandingService } from "src/app/landing-console/landing.service";
import { StorageService } from "src/app/services/storage.service";
import { UserService } from "../user.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _landingService: LandingService,
    private _router: Router,
    private _storageService: StorageService
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

  userPreviewImage: any = '';

  file: any;
  onUploadProfile(event: any) {
    this.file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.userPreviewImage = reader.result;
    }

    reader.readAsDataURL(this.file);
  }

  isLoading: boolean = false;
  onSignup(signupForm: NgForm) {
    if (!signupForm.valid) {
      return;
    }

    this.isLoading = true;

    const formData = new FormData();

    formData.append("name", signupForm.value.userName);
    formData.append("profession", signupForm.value.userProfession);
    formData.append("bio", signupForm.value.userBio);
    formData.append("image", this.file);
    formData.append("email", signupForm.value.userEmail);
    formData.append("password", signupForm.value.userPassword);

    this._userService.createUser(formData).subscribe((response: any) => {
      this.loginUser(signupForm.value.userEmail, signupForm.value.userPassword);

    },
      error => {
        this.isLoading = false;
      })
  }

  loginUser(userEmail: string, password: string) {
    const userData = {
      email: userEmail,
      password: password
    }

    this._userService.loginUser(userData).subscribe((response: any) => {

      this._storageService.setInLocalStorage('userId', response.userData.id);
      this._storageService.setInLocalStorage('userName', response.userData.name);
      this._storageService.setInLocalStorage('userProfession', response.userData.profession);
      this._storageService.setInLocalStorage('userBio', response.userData.bio);
      this._storageService.setInLocalStorage('token', response.userData.token);

      this._landingService.checkAuthentication();

      this._router.navigate(['/posts']);
    },
      error => {
        this.isLoading = false;
      })
  }
}
