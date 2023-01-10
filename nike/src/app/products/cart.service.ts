import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemListArray:any = []
  cartItemsList = new BehaviorSubject([])


  constructor() { }

    //add to cart
    addToCart(product:any){
      this.cartItemListArray.push(product)
      this.cartItemsList.next(this.cartItemListArray)
      console.log(this.cartItemsList);
      let total = this.getTotal()
      console.log(total);
      
      
    }

      //total price

  getTotal(){
    let grandSum =0
    this.cartItemListArray.map((item:any)=>{
      grandSum += item.price
    })
    return grandSum
  }

    //remove a single item
    removeCartItem(product:any){
      this.cartItemListArray.map((item:any,index:any)=>{
        if(product.id == item.id){
          this.cartItemListArray.splice(index,1)
        }
      })
      this.cartItemsList.next(this.cartItemListArray)
    }

     //removeAllItems
  removeAllItems(){
    this.cartItemListArray = []
    this.cartItemsList.next(this.cartItemListArray)
  }
}
