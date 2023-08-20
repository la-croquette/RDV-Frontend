import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AppointmentCreateComponent } from './appointment/appointment-create/appointment-create.component';
import { AppointmentReadComponent } from './appointment/appointment-read/appointment-read.component';

const routes: Routes = [
  {component : LoginComponent, path : ''},
  {component : AppointmentCreateComponent  , path : 'AppointmentCreate'},
  {component : AppointmentReadComponent  , path : 'AppointmentRead'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
