import { Injectable } from '@angular/core';
import { Don } from '../model/Don';
//import { of as ObservableOf } from 'rxjs/observable/of';
// @ts-ignore
import { Observable } from "rxjs-compat";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
    constructor(private http : HttpClient) { }
    getProducts() : Observable<Don[]> {
      return this.http.get<Don[]>('http://localhost:8080/Dons/All');
    }
    toggleFavorite(product: Don): Observable<Don> {
      return this.http.patch<Don>('https://fakestoreapi.com/products' + product.id,
      {
      favorite: !product.favorite
      });
      }
  
  getProductsById(id:number): Observable<Don>{
    return this.http.get<Don>('http://localhost:8080/Dons/afficherUnDon/'+id);
  }

}
