import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  createAppointment( userIdStr: string, clientName: string, appointmentDate: string, appointmentSubject: string) {
    const apiUrl = 'https://localhost:7225/api/Appointment';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


    const userId = parseInt(userIdStr, 10);
    const appointmentData = {
      userId,
      clientName,
      appointmentDate,
      appointmentSubject
    };

    this.http.post(apiUrl, appointmentData, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        // Handle the response here
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors here
      }
    });
  }
}

