import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cartItem';
import { Don } from '../model/Don';

import { of as ObservableOf } from 'rxjs';
import { EtatDemande } from '../shared/etatDemande';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/model/User';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = "http://localhost:8080/api/panier/"
  cartItems : CartItem[] = [];
  cartItem! : CartItem;
  


  constructor(private http : HttpClient) { }
  getCartItem(idpanier:number):Observable<CartItem[]> {
      return this.http.get<CartItem[]>("http://localhost:8080/api/panier/"+idpanier);
  }
  addToCart(idDon : number,user : User):Observable<CartItem>{
    
    return this.http.post<CartItem>("http://localhost:8080/api/panier/Qu/"+idDon,user);
  }
  
  deleteFromCart(idPanierBD : number,idUtilisateur:number) :Observable<CartItem>{

   return this.http.delete<CartItem>(this.url+'deletePanierBD/'+idPanierBD+'/'+idUtilisateur)
}
  inCart(idDon :number ): Observable<Boolean>{
    return this.http.get<Boolean>(this.url+'inCart/'+idDon)
  }
  updatePanierBD(idPanierBD: number, etatDemande: EtatDemande): Observable<CartItem>{
    
    return this.http.put<CartItem>(this.url+"updatePanierBD/"+idPanierBD+"/"+etatDemande,'')
  }

  getPanierBD(idDon : number): Observable<number>{
    return this.http.get<number>(this.url+"getByIdDon/"+idDon)
  }
}

