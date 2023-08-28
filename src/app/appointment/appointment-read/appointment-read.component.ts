import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GetAppointments, Appointment, AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-read',
  templateUrl: './appointment-read.component.html',
  styleUrls: ['./appointment-read.component.css']
})
export class AppointmentReadComponent implements OnInit {
  appointments: Appointment[] = [];
  dataSource = new MatTableDataSource<Appointment>();
  filterValue: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appointmentService: AppointmentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (response: GetAppointments) => {
        this.appointments = response.appointments;
        this.dataSource.data = this.appointments;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error:', error);
        // 在这里处理错误
      },
    });
  }

applyFilter(): void {
  this.dataSource.filter = this.filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
