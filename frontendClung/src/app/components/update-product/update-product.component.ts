import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import {  Product } from "../../models/product";
import { Global } from "../../services/global";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers:[ProductService]
})
export class UpdateProductComponent implements OnInit {

  public products : Product[];
  public url :String;

  constructor(
    private _productService : ProductService
  ) {
    this.url=Global.url;
   }

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(){
    this._productService.getProducts().subscribe(
        response =>{
          if(response.productos){
              this.products = response.productos;
          }
        },
        error => {
          console.log(<any>error);
        }
    )
  }

}
