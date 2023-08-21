import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Add this import

interface UpdateResponse { // Define the UpdateResponse interface
  success: boolean;
  message: string;
  // You can add additional properties if needed based on your backend response
}

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.css']
})
export class AppointmentUpdateComponent implements OnInit {
  appointment_Id: number = 0;
  client_Name: string = "";
  appointment_Date: Date = new Date(2023, 7, 21, 15, 30, 0);
  appointment_Subject: string = "";
  errorMessage: string = ""; // 
  user_id :number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Add this dependency
  ) {}

  ngOnInit(): void {
    // Get appointment details from route parameters
    this.route.params.subscribe((params) => {
      this.appointment_Id = params['appointment_Id'];
      this.client_Name = params['client_Name'];
      this.appointment_Date = params['appointment_Date']; // Convert to Date object
      this.appointment_Subject = params['appointment_Subject'];
      this.user_id = params['user_Id'];
    });
  }

  updateAppointment(client_Name: string, appointment_Date: string, appointment_Subject: string): void {
    const apiUrl = `https://localhost:7225/api/Appointment/${this.appointment_Id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const appointmentData = {
      appointment_Id: this.appointment_Id,
      user_Id: this.user_id, // Make sure to define user_id property
     client_Name,
     appointment_Date,
     appointment_Subject
    };

    this.http.put<UpdateResponse>(apiUrl, appointmentData, { headers }).subscribe({
      next: (response: UpdateResponse) => {
        console.log(response);
        alert(response.message);
        this.router.navigate(['/AppointmentCommercial', {Id :this.user_id}]);
        // Handle the response here
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred: ' + error.message;
        alert(this.errorMessage);
      },
    });
  }
}
