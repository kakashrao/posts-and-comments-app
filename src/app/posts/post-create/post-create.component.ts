import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {

  constructor() {}

  form: FormGroup = new FormGroup({})
  postImages = [];

  ngOnInit() : void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [ Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl('', {
        validators: [ Validators.required ]
      })
    })
  }

  createPost() {}
}
