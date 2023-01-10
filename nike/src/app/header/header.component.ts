import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../products/api.service';
import { CartService } from '../products/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user=""
  isLogout:boolean=false;



  cartItemCount :number=0
  constructor(private api:ApiService, private cart:CartService,
    private router:Router) { }

  ngOnInit(): void {
    this.cart.cartItemsList.subscribe(
      (data:any)=>{
        if(data){
         this.cartItemCount = data.length
        }
      }
    )

    if(localStorage.getItem("username")){
      this.user = localStorage.getItem("username") ||''

    }

    if(!localStorage.getItem("token")){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }


  }
  search(event:any){
    let searchKey = event.target.value
    this.api.searchKey.next(searchKey)
  }


    //logout fnctn

    logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("currentAcno")
      this.isLogout=true
  
      setTimeout(() => {
        this.router.navigateByUrl("")
  
      }, 2000);
        }
  

}
