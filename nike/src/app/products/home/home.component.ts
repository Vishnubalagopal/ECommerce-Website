import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user=""

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      this.user = localStorage.getItem("username") ||''

    }

    if(!localStorage.getItem("token")){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }
  }
  pdetails(){
    this.router.navigateByUrl('/allproducts')
  }

}
