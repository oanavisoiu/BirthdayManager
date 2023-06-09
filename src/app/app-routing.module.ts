import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
