import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'
import { Router,ActivatedRoute,Params } from "@angular/router";


@Component({
  selector: 'app-edit',
  templateUrl: '../create-products/create-products.component.html',
  styleUrls: ['./edit.component.scss'],
  providers:[ProductService,UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public  product : Product;
  public save_Product ;
  public status: string;
  public filesToUpload :Array<File>;
  public url:string;
  constructor(
    private _productService : ProductService,
    private _uploadService : UploadService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { 
    this.title = "Editar Productos";
    this.url = Global.url;
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
  onSubmit(forn){
    //Guardar datos
    this._productService.updateProduct(this.product).subscribe(
      response =>{
        
        if(response.productUpdate){
         
          //subir imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.product._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.status = 'succes';
              this.save_Product = result.product;
            });
          }else{
            this.status = 'succes';
            this.save_Product = response.productUpdate;
          }
          
        }else{
          this.status ='failed';
        }        
      },
      error => {
        console.log("error:"+<any>error);
      }
    );
  }
  fileChangeEvent(fileInput : any){    
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
