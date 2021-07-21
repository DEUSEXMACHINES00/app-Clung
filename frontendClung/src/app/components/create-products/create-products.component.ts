import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
  providers:[ProductService,UploadService]
})
export class CreateProductsComponent implements OnInit {

  public title: string;
  public  product : Product;
  public save_Product ;
  public status: string;
  public filesToUpload :Array<File>;
  public url:string;
  constructor(
    private _productService : ProductService,
    private _uploadService : UploadService
  ) { 
    this.title = "Crear Productos";
    this.product =  new Product('','','','','','');
    this.url=Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    //Guardar datos
    this._productService.saveProduct(this.product).subscribe(
      response =>{
        if(response.product){
         
          //subir imagen
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.product._id,[],this.filesToUpload,'image')
          .then((result:any)=>{
            this.status = 'succes';
            this.save_Product=result.product;
            form.reset();
          });

          
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
