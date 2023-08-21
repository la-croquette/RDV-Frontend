import { Component, OnInit } from '@angular/core';
import { GetAppointments, Appointment} from '../../services/appointment.service'; // 调整路径
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

 appointments: Appointment[] = [];
   constructor(private http: HttpClient) {}
  ngOnInit(): void {
     this.getAppointments();
     this.fetchAppointments();
  }
  deleteAppointment(appointment: Appointment): void {
  const apiUrl = `https://localhost:7225/api/Appointment/${appointment.appointment_Id}`;
  
  this.http.delete(apiUrl).subscribe({
    next: (response) => {
      console.log(response);
      // Refresh the appointment list after deletion
      this.fetchAppointments();
      alert("Appointment deleted successfully");
       this.ngOnInit();
    },
    error: (error) => {
      console.error('Error:', error);
      alert("Failed to delete appointment: " + error.message);
    }
  });
}
  fetchAppointments(): void {
    // Make an API call to fetch appointments from the backend
    const apiUrl = 'https://localhost:7225/api/Appointment';
    this.http.get<Appointment[]>(apiUrl).subscribe({
      next: (response) => {
        this.appointments = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
    editAppointment(appointment: Appointment): void {
    // Implement your editAppointment logic using the provided API call
    // ...
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
