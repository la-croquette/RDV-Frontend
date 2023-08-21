import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetAppointments, Appointment, AppointmentService} from '../../services/appointment.service'; // 调整路径





@Component({
  selector: 'app-appointment-read',
  templateUrl: './appointment-read.component.html',
  styleUrls: ['./appointment-read.component.css']
})
export class AppointmentReadComponent implements OnInit {
   appointments : Appointment[] = [];
   constructor(private appointmentService: AppointmentService, private http: HttpClient) {}
    
  ngOnInit(): void {
     this.getAppointments();
  }
   
  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (response: GetAppointments) => {
        console.log(response);
        this.appointmentService.setAppointments(response.appointments); 
         this.appointments  = this.appointmentService.getAppointmentsArray();
        // 设置数据到服务中
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors here
      },
    });
  }

}
