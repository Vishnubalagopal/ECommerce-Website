import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems:any=[]
  grantTotal:any = 0
  total=0
  updatedTotal:any=0



  constructor(private cart:CartService, private router:Router) { }

  ngOnInit(): void {
    this.cart.cartItemsList.subscribe(
      (data)=>{
        console.log(data);
        this.cartItems = data
        
        
      })
      //granttotal
     this.total = this.cart.getTotal()
      this.grantTotal = this.total.toFixed(2)
  }

  removeAll(){
    this.cart.removeAllItems()
  }



  
  discount2(source:any){
 
    let discount = (this.grantTotal*5)/100
    let discountValue = this.grantTotal-discount
    this.updatedTotal = discountValue.toFixed(2)
  }

  discount30per(source:any){

    let discount = (this.grantTotal*20)/100
    let discountValue = this.grantTotal-discount
    this.updatedTotal = discountValue.toFixed(2)

  }


  discount50per(source:any){

    let discount = (this.grantTotal*50)/100
    let discountValue = this.grantTotal-discount
    this.updatedTotal = discountValue.toFixed(2)

  }
  proceed(){
    this.removeAll()
    alert('your order placed successfully')
    this.router.navigateByUrl('/allproducts')

  }

}
