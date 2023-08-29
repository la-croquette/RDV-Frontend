import { Component, OnInit } from '@angular/core';

import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

class UserResponse {
  success!: boolean;
  message!: string;
  user!: {
    user_id: number;
    username: string ;
    password: string ;
    role: string;
  };
}
class Notification {
  notification_id: number = 0;
  user_id: number = 0;
  message: string = "";
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:HttpClient, 
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title
    ) { } 

  ngOnInit(): void {
     this.titleService.setTitle('Appointment System login')
  }

login(myUsername : string, myPassword : string ) {
  // I can accept any type of the reply
    const headers = new HttpHeaders({ 'accept': '*/*' });

    const api = "https://localhost:7225/api/User";
    const username = myUsername;
    const password = myPassword;

    // Construct the URL with query parameters
    const apiUrl = `${api}?Username=${username}&Password=${password}`;

     this.http.post<UserResponse>(apiUrl, { headers }).subscribe({
      // When the response is successful, the content after next will be called.
      // 响应成功的时候，next之后的内容会被调动。
       next: (response: UserResponse) => {
       console.log(response);
       if(response.success == true){    
             alert(response.message + ', welcome ' + response.user.username + ' ! ' + 'Your role is ' + response.user.role + '!');
            if(response.user.role == "commercial"){  
              this.loadNotifications(response.user.user_id);
              this.router.navigate(['/AppointmentCommercial', {Id :response.user.user_id}])
                                                           }
            else if (response.user.role == "administrative"){  this.router.navigate(['/AppointmentRead']);}         
          }
        else {alert(response.message +  ' ! ');}
          },
        // When the response is not successful, the content after errot will be called. 
        // 错误的时候，打印错误。
        error: (error) => {
       console.error('Error:', error);
         }
        }); }

loadNotifications(userId: number) {
  const api = "https://localhost:7225/api/Notification/GetNotificationsByUserId";
  const apiUrl = `${api}?user_Id=${userId}`;

  this.http.get(apiUrl).subscribe({
    next: (response: any) => {
      if (response.success && Array.isArray(response.notifications)) {
        const notifications = response.notifications as Notification[];
        this.openNotificationDialog(notifications);
      } else {
        console.error('Received data is not in the expected format:', response);
      }
    },
    error: (error) => {
      console.error('Error:', error);
    }
  });
}


 openNotificationDialog(notifications: Notification[]) {
  console.log(notifications)
  const messages = notifications.map(notification => notification.message);
  if (notifications.length == 0){}
  else{
  const dialogRef = this.dialog.open(NotificationDialogComponent, {
    data: messages
  }) };
}

}
