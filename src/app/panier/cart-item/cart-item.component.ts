import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../model/cartItem';
import { EtatDemande } from '../../shared/etatDemande';
import { MessageService } from '../../service/message-service.service';
import { User } from '../../model/User';
import { Message } from '../../model/message';
import { Router } from '@angular/router';
import { Don } from '../../model/Don';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem!: CartItem;
  @Output() public addChat : EventEmitter<CartItem> = new EventEmitter();
  @Output() public deleteItem : EventEmitter<number> = new EventEmitter();
  public accepted : EtatDemande =EtatDemande.accepter;
  fromUser!: User;
  toUser!: User;
  message!: Message;
  chine!: string;
 

  
  constructor(private messageService: MessageService,private route :Router) { }

  ngOnInit(): void {
    
    
  }
  OnDeleteItem(event : MouseEvent){
    this.deleteItem.emit(this.cartItem.id);
    
  }

  addConversion(event: MouseEvent){
    this.addChat.emit(this.cartItem);
  }
  

}
