import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProductsComponent} from './components/create-products/create-products.component';
import { SinginComponent} from './components/singin/singin.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";

import { AuthGuard} from "./auth.guard";


const routes: Routes = [
  {
    path:'',
    redirectTo:'/ingresar',
    pathMatch:'full'
  },
  {
    path:'ingresar',
    component: SinginComponent
  },
  {
    path: 'crear-productos',
    component : CreateProductsComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'actualizarProductos',
    component: UpdateProductComponent
  },
  {
    path:'producto/:id',
    component:DetailComponent
  },
  {
    path:'editar-producto/:id',
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
