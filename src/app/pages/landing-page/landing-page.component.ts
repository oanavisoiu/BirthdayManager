import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  goToSignUpPage() {
    this.router.navigate(['/auth/signup']);
    console.log("sign up page")
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login']);
    console.log("login page")
  }

  ngOnInit(): void {
  }
}
