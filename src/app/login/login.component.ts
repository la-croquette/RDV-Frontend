import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import axios from 'axios';
import { Router } from '@angular/router';

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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:HttpClient, private router: Router) { } 

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
            if(response.user.role == "commercial"){  this.router.navigate(['/AppointmentCommercial', {Id :response.user.user_id}])}
            else if (response.user.role == "administrative"){  this.router.navigate(['/AppointmentRead']);}         
          }
        else {alert(response.message +  ' ! ');}
          },
        error: (error) => {
       console.error('Error:', error);
         }
        }); }
// Methodes for testing     
  public list:any[] = [];
    getData()
  {
    var api = "https://localhost:7225/api/User";
    this.http.get(api).subscribe((response:any) =>{
      console.log(response);
      this.list = response.result;
    });
  }
    getAxiosData(){
    var api = "https://localhost:7225/api/User";
    axios.get(api)
      .then(function (response) {
      // handle success
      console.log(response);
      })
  }

}
