import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global'
import { Router,ActivatedRoute,Params } from "@angular/router";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers:[ProductService]
})
export class DetailComponent implements OnInit {
  public url : string;
  public product : Product;

  constructor(
    private _productService : ProductService,
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    this.url=Global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProduct(id);
    });
  }

  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response=>{
        this.product = response.product;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  deleteProduct(id){
    this._productService.deleteProduct(id).subscribe(
      response=>{
        if(response.product){
          this._router.navigate(['/actualizarProductos']);
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

}
