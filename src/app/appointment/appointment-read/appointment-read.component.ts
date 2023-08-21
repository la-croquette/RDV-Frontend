import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetAppointments, Appointment} from '../../services/appointment.service'; // 调整路径





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
    this.http.get<GetAppointments>(apiUrl, { headers }).subscribe({
      next: (response: GetAppointments) => {
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
