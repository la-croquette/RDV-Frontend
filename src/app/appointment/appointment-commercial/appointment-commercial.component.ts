import { Component, OnInit } from '@angular/core';

import { GetAppointments, Appointment, AppointmentService } from '../../services/appointment.service'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute,Router } from '@angular/router';



class CreateResponse {
  success!: boolean;
  message!: string;
}


@Component({
  selector: 'app-appointment-commercial',
  templateUrl: './appointment-commercial.component.html',
  styleUrls: ['./appointment-commercial.component.css']
})
export class AppointmentCommercialComponent implements OnInit {
  appointments: Appointment[] = [];
  user_id: number  = 0 ;
  errorMessage: string = '';

  constructor(public http: HttpClient, private route : ActivatedRoute,  private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
        this.user_id = this.route.snapshot.params['Id'];
          this.getAppointments();
          this.appointments = this.appointmentService.getAppointmentsArray();
                }

createAppointment( client_Name: string, appointment_Date: string, appointment_Subject: string) {
    const apiUrl = 'https://localhost:7225/api/Appointment';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const appointmentData = {
     user_Id: this.user_id,
     client_Name,
     appointment_Date,
     appointment_Subject
    };

    this.http.post<CreateResponse>(apiUrl, appointmentData, { headers }).subscribe({
      next: (response:CreateResponse) => {
        console.log(response);
        alert(response.message);
             this.ngOnInit();

        // Handle the response here
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Please fill in all three boxes !'+ '\nAn error occurred: ' + error.message; // Store error message
        alert(this.errorMessage); // Display error in alert
      }
    });
  }

deleteAppointment(appointment: Appointment): void {
  const apiUrl = `https://localhost:7225/api/Appointment/${appointment.appointment_Id}`;
  
  this.http.delete(apiUrl).subscribe({
    next: (response) => {
      console.log(response);
      // Refresh the appointment list after deletion
      this.getAppointments();
      alert("Appointment deleted successfully");
       if(appointment.user_Id == this.user_id) {}
       else { 
      const oldTime = new Date (appointment.appointment_Date);
      const oldAppointmentTime =oldTime.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
               minute: '2-digit'
               });


        const   message  = "Your appointment which at " + oldAppointmentTime + " with " +appointment.client_Name 
        +" with the theme of " +  appointment.appointment_Subject +
        " has been deleted " ;
        this.appointmentService.addNotification(appointment.user_Id, message)
}

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
      creater_Id: appointment.user_Id,
      editer_Id : this.user_id
                                       }])  
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (response: GetAppointments) => {
        this.appointments = response.appointments;
      },
      error: (error) => {
        console.error('Error:', error);
        // 在这里处理错误
      },
    });
  }

}
