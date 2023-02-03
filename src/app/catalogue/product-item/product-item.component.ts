import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Don } from '../../model/Don';
import {ProductService} from "../../service/product.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  list_favorie: number[] = [];
  idUder:number=this.authService.ConnectedUser().id


  @Input()public product! : Don;
  @Output() public addToCart: EventEmitter<number>;
  constructor(private authService :AuthService) {

    this.addToCart = new EventEmitter();
   }

  ngOnInit(): void {

      this.authService.Afficher_Favorie_utilisateur(this.idUder).subscribe(
        (data) => {

          console.log("kayn")
          this.list_favorie = data;
          for (let f of this.list_favorie) {
            if (f == this.product.id) {
              this.product.favorite = true
            }
          }

        })
    }


  toggleFavorite() {

    this.product.favorite = !this.product.favorite;


    if(this.product.favorite ){
      this.authService.Ajouter_Favorie_utilisateur(this.idUder,this.product.id).subscribe();


    }
    else{
      this.authService. Supprimer_Favorie_utilisateur(this.idUder,this.product.id).subscribe();
    }


  }





  addToCartN(event : MouseEvent){
    this.addToCart.emit(this.product.id);
    
  }

}
