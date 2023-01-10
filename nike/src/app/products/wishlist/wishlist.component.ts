import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private api:ApiService, private router:Router,private cart : CartService) { }

  wishList:any
  eMsg:string = ''
  user =''

  ngOnInit(): void {
    this.api.getWishlist()
    .subscribe(
      //success response
      (data:any)=>{
        this.wishList = data.result
        if(this.wishList.length==0){
          this.eMsg='empty wishlist'
        }
      },
      //client error
      (data:any)=>{
        this.eMsg = data.error.message
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
    //deleteFromWishlist

    deleteFromWishlist(product:any){
      this.api.deleteFromWishlist(product.id)
    .subscribe(
      (result:any)=>{
  
        this.wishList = result.wishlist
        if(this.wishList.length==0){
          this.eMsg='empty wishlist'
        }
  
        // window.location.reload();//auto refresh
      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }
  
    //addToCart
  
    addToCart(product:any){
      this.cart.addToCart(product)
      this.deleteFromWishlist(product)
    }

}
