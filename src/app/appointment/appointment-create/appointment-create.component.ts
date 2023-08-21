import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute,Router } from '@angular/router';


class CreateResponse {
  success!: boolean;
  message!: string;
}
@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  constructor(public http: HttpClient, private route : ActivatedRoute,  private router: Router) { }
     user_id: number  = 0 ;
    errorMessage: string = '';
     
  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['Id'];
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
       this.router.navigate(['/AppointmentCommercial', {Id :this.user_id}]);
        // Handle the response here
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Please fill in all three boxes !'+ '\nAn error occurred: ' + error.message; // Store error message
        alert(this.errorMessage); // Display error in alert
      }
    });
  }


}

