import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:HttpClient) { } 

  ngOnInit(): void {
  }
   doLogin() {
    const headers = new HttpHeaders({ 'accept': '*/*' });

    const api = "https://localhost:7225/api/User";
    const username = 'ning';
    const password = 'ning';

    // Construct the URL with query parameters
    const apiUrl = `${api}?Username=${username}&Password=${password}`;

    this.http.post(apiUrl, { headers }).subscribe(response => {
      console.log(response);      
    });
  }
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
