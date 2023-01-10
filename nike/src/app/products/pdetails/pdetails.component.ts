import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-pdetails',
  templateUrl: './pdetails.component.html',
  styleUrls: ['./pdetails.component.css']
})
export class PdetailsComponent implements OnInit {

  constructor(private api:ApiService, private activatedRoute:ActivatedRoute, private cart:CartService) { }

  allProducts:any = []

  pId:any;


  ngOnInit(): void {

 


    this.activatedRoute.params.subscribe(result=>{
      // console.log(result.id);
      this.pId = result['id']
      console.log(this.pId);
      
      
    })

    this.api.getProduct(this.pId)
    .subscribe((data:any)=>{
      this.allProducts = data.result
      console.log(this.allProducts);

      
      
      
    })


  }

  addToWishList(allProducts:any){
    this.api.addToWishList(allProducts)
    .subscribe(
      (result:any)=>{
        alert(result.message)
      },
      (result:any)=>{
        alert(result.error.message)
      }

      )
  }

    //addToCart
    addToCart(allProducts:any){
      this.cart.addToCart(allProducts)
    }
  

  
}
