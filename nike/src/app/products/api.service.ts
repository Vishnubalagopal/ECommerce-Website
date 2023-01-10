import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchKey = new BehaviorSubject('')


  constructor(private http:HttpClient) { }

    //getAllProducts
    getAllProducts(){
      return this.http.get('http://localhost:3000/allproducts')
    }

    //get single product
    getProduct(id:any){
      return this.http.get('http://localhost:3000/pdetails/'+id)
    }

      //addToWishList
  addToWishList(product:any){
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      description:product.description,
      image:product.image,
      type:product.type
  
    }
     return this.http.post('http://localhost:3000/add-to-wishlist',body)
  }


      //getWishlist

  getWishlist(){
    return this.http.get('http://localhost:3000/get-wishlist')
  }

    //deleteFromWishlist

    deleteFromWishlist(id:any){
      return this.http.delete('http://localhost:3000/delete-item-wishlist/'+id)
    }
  
}
