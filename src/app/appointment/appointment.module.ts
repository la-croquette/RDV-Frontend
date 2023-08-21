import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 导入 FormsModule
import { AppointmentReadComponent } from './appointment-read/appointment-read.component';
import { AppointmentCommercialComponent } from './appointment-commercial/appointment-commercial.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; // 导入 MatSortModule
import { MatPaginatorModule } from '@angular/material/paginator'; // 导入 MatPaginatorModule
import { MatInputModule } from '@angular/material/input'; // 导入 MatInputModule

@NgModule({
  declarations: [
    AppointmentReadComponent,
    AppointmentCommercialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule, // 添加 MatSortModule
    MatPaginatorModule, // 添加 MatPaginatorModule
    MatInputModule // 添加 MatInputModule
  ],
  exports: [
    AppointmentReadComponent,
    AppointmentCommercialComponent
  ]
})
export class AppointmentModule { }
