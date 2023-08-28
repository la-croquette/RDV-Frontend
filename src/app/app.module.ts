import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { AppointmentModule } from './appointment/appointment.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  // declaration 是用于声明属于自己的组件, 这些组件可以使用这里声明的Module
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationDialogComponent

   
  ],
  // imports 是用于声明从其他的部分导入的组件
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppointmentModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
