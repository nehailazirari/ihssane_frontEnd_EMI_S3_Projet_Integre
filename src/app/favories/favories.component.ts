import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Don} from "../model/Don";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styleUrls: ['./favories.component.css']
})
export class FavoriesComponent implements OnInit {

  don_favorie: Don[]=[];
  UserConnecte!:User ;


  constructor(private authService :AuthService,private productService :ProductService) {

  }

  ngOnInit(): void {

    this.UserConnecte = this.authService.ConnectedUser();

    //Afficher les favories de l'utilisateur connecté

    this.authService.Afficher_Favorie_utilisateur(this.UserConnecte.id).subscribe(
      (idFavories)=>{
        for(let i of idFavories ){

          this.productService.getProductsById(i).subscribe(((data: Don)=>{
            this.don_favorie.push(data);


        }
        ))}

      }
    )

  }

  supprimer_favorie(idfav: number) {
    if (confirm("Voulez vous supprimer le favorie !")) {
    this.authService.Supprimer_Favorie_utilisateur(this.UserConnecte.id,idfav).subscribe()
  }
  }
}
