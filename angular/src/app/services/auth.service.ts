import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('jwt')
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = "https://bigdataproject-pvaddi.c9users.io:8080";
  successInd: boolean;
  info:any;

  constructor(private http : HttpClient) { }
  
  userRegistration(route, userInfo){
    this.http.post(this.baseUrl+route,userInfo).subscribe((data:any) =>{
      if(data){
        if(data.successInd){
          this.successInd = true;
          this.info = data.message;
        }else{
          this.successInd = false;
          this.info  = "Error occured while registration";
        }
      }else{
        this.successInd = false;
        this.info  = "Error occured while registration";
      }
    });
  }
  
  login(route,credentials){
      return this.http.post(this.baseUrl+route,credentials).subscribe((data:any) =>{
        if(data){
          if(data.successInd){
            this.successInd = true;
            localStorage.setItem('jwt',data.token);
          }else{
            this.successInd = true;
          }
        }else{
          this.successInd = false;
        }
      });
  }
}
