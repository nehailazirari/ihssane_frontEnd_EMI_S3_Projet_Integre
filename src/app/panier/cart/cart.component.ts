import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../cartItem';
import { Observable } from 'rxjs';
import { CartService } from '../../service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems$: Observable<CartItem[]> = new Observable();

  constructor(private cartService : CartService) {
    this.cartItems$ = this.cartService.getCartItem();
   }

  ngOnInit(): void {
  }

  OnDeleteItem(id : number){
    this.cartService.deleteFromCart(id);
  }
}
