import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { MaterialModule } from '../material/material.module';
import { ZorroModule } from '../zorro/zorro.module';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ZorroModule
  ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
