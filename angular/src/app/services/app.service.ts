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
export class AppService {

  baseUrl = "https://bigdataproject-pvaddi.c9users.io:8080/";
  weatherUrl = "http://samples.openweathermap.org/data/2.5/weather?id=";

  constructor(private http : HttpClient) { 
  }

  postRequest(route,itemjson){
    return this.http.post(this.baseUrl+route,itemjson,httpOptions);
  }

  getRequest(route){
      return this.http.get(this.baseUrl+route,httpOptions);  
  }
  
  getParamRequest(route,city_json){
    return this.http.get(this.baseUrl+route,city_json);
  }
  
  getWeatherData(city_id){
    this.weatherUrl = this.weatherUrl+city_id;
    this.weatherUrl = this.weatherUrl+"&appid=dc972d3944682b950e42c98ee9525d34";
    return this.http.get(this.weatherUrl);
  }
}
