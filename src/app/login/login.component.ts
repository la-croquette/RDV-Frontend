import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog) { } 

  ngOnInit(): void {
  }

login(myUsername : string, myPassword : string ) {
    const headers = new HttpHeaders({ 'accept': '*/*' });

    const api = "https://localhost:7225/api/User";
    const username = myUsername;
    const password = myPassword;

    // Construct the URL with query parameters
    const apiUrl = `${api}?Username=${username}&Password=${password}`;

     this.http.post<UserResponse>(apiUrl, { headers }).subscribe({
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
  const dialogRef = this.dialog.open(NotificationDialogComponent, {
    data: messages
  });
}

}
