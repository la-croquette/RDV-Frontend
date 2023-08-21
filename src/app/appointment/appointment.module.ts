import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component'; // 调整为你的组件路径
import { FormsModule } from '@angular/forms'; // 导入 FormsModule
import { AppointmentReadComponent } from './appointment-read/appointment-read.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component'; 
import { AppointmentCommercialComponent } from './appointment-commercial/appointment-commercial.component';


@NgModule({
  declarations: [
    AppointmentCreateComponent ,
    AppointmentReadComponent,
    AppointmentEditComponent,
    AppointmentCommercialComponent

  ],
  imports: [
    CommonModule,
    FormsModule  
  ],
   exports: [AppointmentCreateComponent, AppointmentReadComponent , AppointmentEditComponent]
})
export class AppointmentModule { }
