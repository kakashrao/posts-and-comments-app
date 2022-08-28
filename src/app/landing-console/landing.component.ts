import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private _router: Router) {}

  currentUrl: string = '';

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const length = event.url.split('/')['length'];
        this.currentUrl = event.url.split('/')[length - 1];
        console.log(this.currentUrl);
      }
    });
  }
}
