import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../model/cartItem';
import { CartService } from '../../service/cart.service';
import { Panier } from '../panier';
import { Router } from '@angular/router';
import { Don } from '../../model/Don';
import { User } from '../../model/User';
import { Message } from '../../model/message';
import { MessageService } from '../../service/message-service.service';
import { AuthService } from 'app/service/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: CartItem[] =[];
  public panier! : Panier;
  fromUser!: User;
  toUser!: User;
  message!: Message;
  chine!: string;
  currentUser!: User;
 
  constructor(private cartService : CartService,private route : Router,private messageService : MessageService,
    private authService: AuthService) {
    
   }
   
  ngOnInit(): void {
    this.currentUser = this.authService.ConnectedUser();
    this.cartService.getCartItem(this.currentUser.id).subscribe((reponse:any)=>{
      this.panier=reponse;
      this.cartItems=this.panier.panierBD;
    

      
    })
  }
  
    
  
  OnDeleteItem(idPanierBD : number){
    this.cartService.deleteFromCart(idPanierBD,this.currentUser.id).subscribe((res)=>{
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/panier']));


    });
  }
  addConversion(cartItem:CartItem){
    
    this.messageService.getUser(this.currentUser.id).subscribe((reponse : any)=>{
      this.fromUser=reponse;
      
    })
    if(cartItem.don){
      
      
      if(cartItem.don.donneur){
    this.messageService.getUser(cartItem.don.donneur.id).subscribe((reponse : any)=>{
      this.toUser=reponse;
      
      
      
    })}}
    if(this.fromUser&&this.toUser){
      
      
     this.message = new Message(5,"salut je veux ton don",this.fromUser,this.toUser,new Date(),new Date())
     if(this.message){
      this.messageService.sendMessage(this.message).subscribe((res)=>{
      
      
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/panier']));
  
     })}
  
    }
  }
}
