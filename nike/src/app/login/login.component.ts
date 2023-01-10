import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  eMsg=""
  spin=""


  //login form

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid){

    let email = this.loginForm.value.email
    let pswd = this.loginForm.value.pswd

    //asynchronous

    this.api.login(email,pswd)
    .subscribe(
      //response 200
      (result:any)=>{
      console.log(result);
      localStorage.setItem("username",result.username)
      localStorage.setItem("token",result.token)
      localStorage.setItem("currentEmail",result.currentEmail)

      // alert(result.message)
      this.spin = result.message
      setTimeout(()=>{
        this.router.navigateByUrl('products/home')

      },2000)

      
    },
    //response 4xx
    (result:any)=>{
      this.eMsg = result.error.message
      // alert(result.error.message)
      
    }

    )

  }
  else{
    alert('invalid form')

  }



  
}

}
