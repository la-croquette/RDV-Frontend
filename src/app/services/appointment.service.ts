import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointments() {
    const apiUrl = 'https://localhost:7225/api/Appointment';
    const headers = new HttpHeaders({ 'accept': '*/*' });

    return this.http.get<GetAppointments>(apiUrl, { headers });
  }
}

export class GetAppointments {
  success: boolean = false;
  appointments: Appointment[] = [];
}

export class Appointment {
  appointment_Id: number = 0;
  user_Id: number = 0;
  client_Name: string = "";
  appointment_Date: Date =  new Date(2023, 7, 21, 15, 30, 0);
  appointment_Subject: string = "";
}
