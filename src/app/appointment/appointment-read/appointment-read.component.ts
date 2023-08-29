import { Component, OnInit, ViewChild } from '@angular/core';
// MatTableDataSource is a utility class，MatSort is a directive，and MatPaginator is a component.
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
  // Appointment: This is a generic type parameter used to specify the type of data this data source will contain. 
  dataSource = new MatTableDataSource<Appointment>();
  filterValue: string = '';
  // It is for finding the first directive of MatSort in the template.
  @ViewChild(MatSort) sort!: MatSort;
  // It is for finding the first directive of MatPaginator in the template.
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appointmentService: AppointmentService) {}

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
  // Here we have a setter, it is not only a atttibute, but also we have some methodes in the filter
  this.dataSource.filter = this.filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
