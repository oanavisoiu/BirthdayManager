import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AddFriendsComponent } from './dialogs/add-friends/add-friends.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpPageComponent,
    MainPageComponent,
    LogInPageComponent,
    AddFriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NzDropDownModule,
    NzTableModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }