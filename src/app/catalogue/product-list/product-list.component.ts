import { Component, OnInit } from '@angular/core';
import { Don } from '../../model/Don';
import { ProductService } from '../../service/product.service';

import { Observable } from "rxjs";
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/service/message-service.service';
import { NotifyService } from 'app/service/notify-service.service';
import { User } from 'app/model/User';
import { Notify } from 'app/model/notify';
import { CartItem } from 'app/model/cartItem';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public user! : User;
  notification! : Notify;
  cartItem! : CartItem;

  public products$: Observable<Don[]> = new Observable()

  constructor(private productService : ProductService,private notifyService:NotifyService,
    private route : Router, private cartService : CartService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();

  }

  addToCart(idDon:number){
    this.messageService.getUser(1).subscribe((reponse : any)=>{
      this.user=reponse;
      let CartItemExist;
      this.cartService.inCart(idDon).subscribe((res)=>{
        CartItemExist = res;if(!CartItemExist){this.cartService.addToCart(idDon,this.user).subscribe((res )=>{
        this.cartItem = res;
        console.log(res);
        
        this.cartService.getPanierBD(idDon).subscribe((res)=>{
        this.cartItem.id= res;
        if(this.cartItem ) {this.notification = new Notify(2,this.user,this.cartItem)}
        if(this.notification){ this.notifyService.sendNotify(this.notification).subscribe((res)=>{

          })      
        } 
        })
        
      
          
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/panier']));
        
      })}
      })
      
    })
   }

}
