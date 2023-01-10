import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  allProducts:any = []
  searchTerm :string=''


  ngOnInit(): void {

    this.api.getAllProducts()
    .subscribe((data:any)=>{
      this.allProducts = data.result
    })

    this.api.searchKey.subscribe(
      (data:any)=>{
        this.searchTerm = data
      }
    )
    

 

  }

    //navigte to product details
    selectProduct(id: string) {
      this.router.navigate(['/pdetails', id])
    }

}
