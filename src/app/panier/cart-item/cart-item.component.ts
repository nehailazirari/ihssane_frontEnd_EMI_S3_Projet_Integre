import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../cartItem';
import { EtatDemande } from 'src/app/shared/etatDemande';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem = new CartItem(0,'',0,0,'');
  
   
  @Output() public deleteItem : EventEmitter<number> = new EventEmitter();
 public accepted : EtatDemande =EtatDemande.accepted;
 

  
  constructor() { }

  ngOnInit(): void {
  }
  OnDeleteItem(event : MouseEvent){
    this.deleteItem.emit(this.cartItem.id);
  }


}
