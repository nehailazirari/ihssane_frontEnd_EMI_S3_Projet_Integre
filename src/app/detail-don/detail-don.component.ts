import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Don} from "../model/Don";
import {ActivatedRoute, Router} from "@angular/router";
import { ProductService } from '../service/product.service';
import {User} from "../model/User";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-detail-don',
  templateUrl: './detail-don.component.html',
  styleUrls: ['./detail-don.component.css']
})
export class DetailDonComponent implements OnInit {
  dondetail!: Don;
  idUder:number=this.authService.ConnectedUser().id
  donneur!:User;
  produitSimiliaire:Array<Don>=[];
  list_favorie: number[] = [];


  @Output() public addToCart: EventEmitter<Don>;
  constructor(private authService:AuthService ,private productService:ProductService,private route:ActivatedRoute, private router: Router) {
    this.addToCart = new EventEmitter();
  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    this.productService.getProducts().subscribe((data: any) => {

      for (var p of data) {
        if (p.id == id) {
          this.dondetail = p;
        }

      }
      //Favorie

      this.authService.Afficher_Favorie_utilisateur(this.idUder).subscribe(
        (data) => {

          this.list_favorie = data;
          for (let f of this.list_favorie) {
            if (f == this.dondetail.id) {
              this.dondetail.favorite = true
            }
          }

        })

      //Similaire
      this.productService.getProducts().subscribe((data: any)=> {
          for (let d of data) {
            if(this.dondetail.category.designation==d.category.designation){
              this.produitSimiliaire.push(d);
            }

          }
        }
      )


      //L utilisateur qui a ce dons = donneur

    })
  }
toggleFavorite() {

  this.dondetail.favorite = !this.dondetail.favorite;


  if(this.dondetail.favorite ){
    this.authService.Ajouter_Favorie_utilisateur(this.idUder,this.dondetail.id).subscribe();


  }
  else{
    this.authService. Supprimer_Favorie_utilisateur(this.idUder,this.dondetail.id).subscribe();
  }


}
addToCartN(event : MouseEvent){
  this.addToCart.emit(this.dondetail);
  console.log("shshshsh")
}

}
