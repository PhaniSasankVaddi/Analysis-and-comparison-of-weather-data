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
  change_temp:any;

  constructor(private appService : AppService,private router : Router) { }

  ngOnInit() {
    if(!localStorage.getItem('jwt')){
      this.router.navigate(['/auth/login']);
    }
  }
  
  onSearch(){
    let city_json = {
      'city_name':this.city_name
    }
    this.appService.getParamRequest('findcity',city_json).subscribe((city: any)=>{
      if(city){
        this.get_present_data(city.id);
        //this.get_historical_data(cityName);
      }
    })
  }
  
  get_present_data(city_id){
    this.appService.getWeatherData(city_id).subscribe((data: any)=>{
      if(data.main){
        this.weatherData.push(data.main);
      }
    })
  }
  
  get_historical_data(){
    
  }

}
