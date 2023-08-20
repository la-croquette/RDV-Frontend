import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class GetResponse {
  success: boolean = false;
  appointments: Appointment[] = [];
}


class Appointment {
  appointment_Id: number = 0;
  user_Id: number =0 ;
  client_Name: string = "";
  appointment_Date: string = "";
  appointment_Subject: string = "";
}
@Component({
  selector: 'app-appointment-read',
  templateUrl: './appointment-read.component.html',
  styleUrls: ['./appointment-read.component.css']
})
export class AppointmentReadComponent implements OnInit {
    appointments: Appointment[] = [];
   constructor(private http: HttpClient) {}
    
  ngOnInit(): void {
       this.getAppointments();
  }
    getAppointments() {
    const apiUrl = 'https://localhost:7225/api/Appointment';
    const headers = new HttpHeaders({ 'accept': '*/*' });

    this.http.get<GetResponse>(apiUrl, { headers }).subscribe({
      next: (response: GetResponse) => {
        console.log(response);
        this.appointments = response.appointments;
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors here
      }
    });
  }

}
