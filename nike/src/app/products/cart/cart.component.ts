import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:any=[]
  grantTotal:any = 0
  total=0
  user=''


  constructor(private cart:CartService, private router:Router , private api:ApiService) { }

  ngOnInit(): void {
    this.cart.cartItemsList.subscribe(
      (data)=>{
        console.log(data);
        this.cartItems = data
        
        
      })
      //granttotal
     this.total = this.cart.getTotal()
      this.grantTotal = this.total.toFixed(2)

      if(localStorage.getItem("username")){
        this.user = localStorage.getItem("username") ||''
  
      }
  
      if(!localStorage.getItem("token")){
        alert("Please Log In")
        this.router.navigateByUrl("")
      }

  }
  
    //remove item
    removeItem(product:any){
      this.cart.removeCartItem(product)
      this.total = this.cart.getTotal()
      this.grantTotal = this.total.toFixed(2)
  
    }

      //addTowislist
  
      addToWishList(product:any){
        this.api.addToWishList(product)
        .subscribe(
          (result:any)=>{
            alert(result.message)
          },
          (result:any)=>{
            alert(result.error.message)
          }
    
          )
          this.cart.removeCartItem(product)

      }


}
