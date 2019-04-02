import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  model: any = {};
  signup:boolean;
  signupMsg:any;

  constructor(private authservice : AuthService,
              private router : Router) { }

  ngOnInit() {
  }
  
  confirmPassword(){
    if(this.model.password ==this.model.cnfpassword){
      return false;
    }else{
      return true;
    }
  }
  
  onSubmit() {
    let userInfo = {
      'email':this.model.email,
      'password':this.model.password,
      'username':this.model.username
    }
    this.authservice.userRegistration("/signup",userInfo);
    if(this.authservice.successInd){
      this.router.navigate(['/auth/login']);
    }else{
      this.signup = true;
    this.signupMsg = this.authservice.info;
    }
  }

}