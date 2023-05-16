import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AddFriendsComponent } from './dialogs/add-friends/add-friends.component';
import { EditFriendsComponent } from './dialogs/edit-friends/edit-friends.component';
import { ZorroModule } from './shared/modules/zorro/zorro.module';
import { MainPageModule } from './shared/modules/main-page/main-page.module';
import { LandingPageModule } from './shared/modules/landing-page/landing-page.module';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LogInPageComponent,
    AddFriendsComponent,
    EditFriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ZorroModule,
    MainPageModule,
    LandingPageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
