import { Component, OnInit } from '@angular/core';
import { Don } from '../../model/Don';
import { ProductService } from '../../service/product.service';

import { Observable } from "rxjs";
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Don[]> = new Observable()

  constructor(private productService : ProductService, private cartService : CartService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();

  }

  addToCart(product : Don){
    this.cartService.addToCart(product);
   }

}
