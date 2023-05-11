import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewAccountDiagol } from './components/add-new-dialog';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpPageComponent,
    MainPageComponent,
    LogInPageComponent,
    AddNewAccountDiagol
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }