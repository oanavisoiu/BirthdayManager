import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ZorroModule } from '../zorro/zorro.module';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:LandingPageComponent}
    ]),
    MaterialModule,
    ZorroModule,
  ],
  exports: [LandingPageComponent]
})
export class LandingPageModule { }
