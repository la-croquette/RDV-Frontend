import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';

import { AppointmentReadComponent } from './appointment/appointment-read/appointment-read.component';
import {AppointmentCommercialComponent } from './appointment/appointment-commercial/appointment-commercial.component';
import { AppointmentUpdateComponent } from './appointment/appointment-update/appointment-update.component';

const routes: Routes = [
  {component : LoginComponent, path : ''},
  {component : AppointmentReadComponent  , path : 'AppointmentRead'},
  {component : AppointmentCommercialComponent   , path : 'AppointmentCommercial'},
  {component : AppointmentUpdateComponent   , path : 'AppointmentUpdate'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
