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


  @Input()public product : Don = new Don(1,"Fjallr",109.95,"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","men's clothing","https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg");

  @Output() public addToCart: EventEmitter<Don>;
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
    this.addToCart.emit(this.product);
    console.log("shshshsh")
  }

}
