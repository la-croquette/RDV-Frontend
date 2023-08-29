import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatInputModule } from '@angular/material/input'; 

import { AppointmentReadComponent } from './appointment-read/appointment-read.component';
import { AppointmentCommercialComponent } from './appointment-commercial/appointment-commercial.component';
@NgModule({
  declarations: [
    AppointmentReadComponent,
    AppointmentCommercialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    MatInputModule 
  ],

})
export class AppointmentModule { }
