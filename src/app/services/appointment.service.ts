import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7225/api/Notification/AddNotification';
  private appointments: Appointment[] = [];
  constructor(private http: HttpClient) {}

// To get all the appointments, is used by commercial and administrative for listing the appointments
// 对于Observabale的理解 ： 
getAppointments(): Observable<GetAppointments> {
    const headers = new HttpHeaders({ 'accept': '*/*' });
    const apiUrl = 'https://localhost:7225/api/Appointment';
    return this.http.get<GetAppointments>(apiUrl, { headers });
  }

    getAppointmentsArray(): Appointment[] {
    return this.appointments;
  }
    setAppointments(appointments: Appointment[]): void {
    this.appointments = appointments;
  }
// To add a new notification to someone whose appointment has been changed
 addNotification(user_Id: number, message: string): void {
    const headers = new HttpHeaders({ 'accept': '*/*' });
  const apiUrl = 'https://localhost:7225/api/Notification/AddNotification';
    const queryParams = `user_Id=${user_Id}&message=${encodeURIComponent(message)}`;
    const url = `${apiUrl}?${queryParams}`;

    this.http.post(url, null, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        alert('Notification added successfully');
        // Handle the response here
      },
      error: (error) => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
      },
    });
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

