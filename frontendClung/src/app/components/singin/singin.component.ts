import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {

  user = {
    user:'',
    password:''
  }

  constructor(
    private authService : AuthService,
    private router : Router
     ) { }

  ngOnInit(): void {
  }

  signin(){
    this.authService.singin(this.user)
      .subscribe(
        res =>  {          
          localStorage.setItem('token',res.token);
          this.router.navigate(['/crear-productos']);          
        },
        err =>console.log(<any>err)
      )
  }

}
