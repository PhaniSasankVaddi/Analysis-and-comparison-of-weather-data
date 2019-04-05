import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  weatherData:any = [];
  city_name: String;
  change_temp:Number = 0;
  country: String;

  constructor(private appService : AppService,private router : Router) { 
    
  }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }
  }
  
  onSearch(){
    
    let city_json = {
      'city_name':this.city_name,
      'country': this.country
    }
    //console.log(city_json)
    this.appService.getParamRequest('findcity',city_json).subscribe((city: any)=>{
      if(city){
        var temp = this.get_present_data(city.id);
        var past_temp = this.get_historical_data(city.id);
        //this.change_temp = ((parseFloat(temp)-parseFloat(past_temp))/parseFloat(past_temp))*100;
      }
    })
  }
  
  get_present_data(city_id){
    this.appService.getWeatherData(city_id).subscribe((data: any)=>{
      if(data.main){
        this.weatherData.push(data.main);
        return data.main.temp;
      }
    })
  }
  
  get_historical_data(city_id){
    this.appService.gethistoricalData('gethistdata',city_id).subscribe((data:any)=>{
      if(data){
        return data;
      }
    })
    
  }

}
