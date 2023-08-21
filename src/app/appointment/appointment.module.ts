import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 导入 FormsModule
import { AppointmentReadComponent } from './appointment-read/appointment-read.component';
import { AppointmentCommercialComponent } from './appointment-commercial/appointment-commercial.component';


@NgModule({
  declarations: [
    AppointmentReadComponent,
    AppointmentCommercialComponent
  ],
  imports: [
    CommonModule,
    FormsModule  
  ],
   exports: [ ]
})
export class AppointmentModule { }
