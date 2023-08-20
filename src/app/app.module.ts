import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppointmentModule } from './appointment/appointment.module';


@NgModule({
  // declaration 是用于声明属于自己的组件
  declarations: [
    AppComponent,
    LoginComponent
  ],
  // imports 是用于声明从其他的部分导入的组件
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppointmentModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
