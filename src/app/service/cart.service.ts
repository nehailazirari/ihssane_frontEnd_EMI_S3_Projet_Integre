import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../panier/cartItem';
import { Don } from '../model/Don';

import { of as ObservableOf } from 'rxjs';
import { EtatDemande } from '../shared/etatDemande';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public item : CartItem ;

  cartItems : CartItem[] = [];
  cartItem : CartItem  = new CartItem(0,'',0,0,'');
  http: any;
  constructor() {
    this.item= new CartItem(1,"Fjallr",1,109.95,"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg");
    this.item.etatDemande = EtatDemande.accepted;
    this.cartItems.push(this.item); }
  getCartItem():Observable<CartItem[]> {
      return ObservableOf(this.cartItems);
  }
  addToCart(product : Don){
    this.cartItem = new CartItem(product.id,product.title,1,product.price,product.image);

    if(!this.InCart(this.cartItem.id)){this.cartItems.push(this.cartItem);
    }
  }
  InCart(id : number): Boolean{
    for(var i=0; i<this.cartItems.length; i++){
      if(id === this.cartItems[i].id){
        return true;
      }

    }
    return false;
  }
  deleteFromCart(id : number){
    let index :number=-1;
    for(var i=0; i<this.cartItems.length; i++){
      if(id === this.cartItems[i].id){
        index = i;
      }}
    if (index > -1) {
    this.cartItems.splice(index, 1);
    }
  }
}

