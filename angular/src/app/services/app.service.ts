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
  weatherUrl = "https://api.openweathermap.org/data/2.5/weather?id=";
  historicalUrl = "https://processingdata.mybluemix.net/";
  //historicalUrl = "https://dataplatform.cloud.ibm.com/analytics/notebooks/v2/1b60dd1c-f372-4ae5-853f-b60bb705fc00/view?access_token=f659345eb886936ef7e7b271f5b8ea000a3bf6530916694c4a66b9b1d970c34c"

  constructor(private http : HttpClient) { 
  }

  postRequest(route,itemjson){
    return this.http.post(this.baseUrl+route,itemjson,httpOptions);
  }

  getRequest(route){
      return this.http.get(this.baseUrl+route,httpOptions);  
  }
  
  getParamRequest(route,city_json){
    return this.http.post(this.baseUrl+route,city_json);
  }
  
  getWeatherData(city_id){
    this.weatherUrl = this.weatherUrl+city_id;
    this.weatherUrl = this.weatherUrl+"&appid=dc972d3944682b950e42c98ee9525d34";
    return this.http.get(this.weatherUrl);
  }
  
  gethistoricalData(route,city_id){
    return this.http.post(this.historicalUrl+route,city_id,httpOptions);
  }
}
