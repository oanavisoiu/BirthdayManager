import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth/signup',
    component: SignUpPageComponent
  },
  {
    path: 'users/:id/accounts',
    component: MainPageComponent
  },
  {
    path: "auth/login",
    component: LogInPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
