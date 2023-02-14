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
import {Category} from "../../model/category";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public user! : User;
  notification! : Notify;
  cartItem! : CartItem;
  don_filtre :Don[]=[];
  elem=true;

  public products$: Observable<Don[]> = new Observable()
  categories  =new Set<String>();
  villes= new Set<String>();


  constructor(private productService : ProductService,private notifyService:NotifyService,
    private route : Router, private cartService : CartService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.elem=true;
    this.products$ = this.productService.getProducts();


    this.products$.subscribe((data)=>{
      for(let cat of data ){
        this.categories.add(cat.category.designation)
        this.villes.add(cat.donneur.ville)
      }
      console.log(this.villes);
      
      }
    )

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

  filter() {
   const categorie = (document.querySelector('select[name="sortby"]:nth-of-type(1)') as HTMLSelectElement).value;
    const ville = (document.querySelector('select[name="sortby"]:nth-of-type(2)') as HTMLSelectElement).value;
  
  
    this.products$.subscribe((data)=>{
      for(let d of data){
        if(<string> categorie==d.category.designation  && <String> ville==d.donneur.ville){
          this.don_filtre.push(d);
        }
      }
      console.log(this.don_filtre);
      
      this.elem=false;
       //3tiha*/
     
      
   
      
      }
    )

  }
}