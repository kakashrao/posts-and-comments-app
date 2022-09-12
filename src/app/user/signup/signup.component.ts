import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LandingService } from "src/app/landing-console/landing.service";
import { UserService } from "../user.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {

  constructor(
    private _userService: UserService,
    private _landingService: LandingService,
    private _router: Router
  ) {}

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
    if(!signupForm.valid) {
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
      this._landingService.checkAuthentication();

      this._router.navigate(['/posts']);
    },
    error => {
      this.isLoading = false;
      console.log(error);
    })
  }
}
