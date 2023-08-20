import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute,Route } from '@angular/router';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  constructor(public http: HttpClient, private route : ActivatedRoute) { }
     user_id: number  = 0 ;
     
  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['Id'];
  }

  createAppointment( clientName: string, appointmentDate: string, appointmentSubject: string) {
    const apiUrl = 'https://localhost:7225/api/Appointment';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const appointmentData = {
     userId: this.user_id,
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

