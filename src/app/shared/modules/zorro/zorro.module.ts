import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule
  ],
  exports: [
    NzDropDownModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule
  ]
})
export class ZorroModule { }
