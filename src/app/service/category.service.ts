import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public host: string = "http://localhost:8080/Category";
  constructor(private http:HttpClient,private auth:AuthService) { }



  getCategory(){
    //return this.http.get("https://dummyjson.com/products/categories")
    return this.http.get(this.host+"/categories")
  }

  id:number=this.auth.ConnectedUser().id;

  getProductByCategory(value:string){
    //return this.http.get("https://dummyjson.com/products/category/"+product);
    //value="b"
    //console.log("value "+value);
    return this.http.get(`http://localhost:8080/Dons/category/${this.id}/${value}`);
  }

  getCategorieById(id:number){
    return this.http.get(this.host+"/categorie/"+id);
  }
}
