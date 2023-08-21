import { Component, OnInit } from '@angular/core';
import { GetAppointments, Appointment} from '../../services/appointment.service'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

 appointments: Appointment[] = [];
   constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
     this.getAppointments();
    //  this.fetchAppointments();
  }
  deleteAppointment(appointment: Appointment): void {
  const apiUrl = `https://localhost:7225/api/Appointment/${appointment.appointment_Id}`;
  
  this.http.delete(apiUrl).subscribe({
    next: (response) => {
      console.log(response);
      // Refresh the appointment list after deletion
      this.getAppointments();
      alert("Appointment deleted successfully");
       this.ngOnInit();
    },
    error: (error) => {
      console.error('Error:', error);
      alert("Failed to delete appointment: " + error.message);
    }
  });
}

    navigateToUpdate(appointment: Appointment): void {


     this.router.navigate(['/AppointmentUpdate', {
      appointment_Id :appointment.appointment_Id, 
      client_Name :appointment.client_Name,
      appointment_Date :appointment.appointment_Date, 
      appointment_Subject :appointment.appointment_Subject, 
      user_Id: appointment.user_Id
                                       }])  
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
