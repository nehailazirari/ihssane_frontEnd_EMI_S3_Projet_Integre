import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {Donation} from "../model/donation";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ListDonationsService {
  private products: any;

  public host: string = "http://localhost:8080/Dons";

  value:any
  edit:boolean=false;
  id: number | undefined;
  constructor(private http:HttpClient,private auth :AuthService) {

    let user = this.auth.ConnectedUser();
    if (user) {
      this.id = user.id;
    } else {
      console.error("Connected user is null or undefined, cannot access its id property");
    }
    console.log("idddd "+this.id);

  }
  getAllDonations(){
    //return this.http.get('https://dummyjson.com/products' );
    console.log("iddddd "+this.id);
    return this.http.get(this.host+'/afficherTousDons/'+this.id );
  }

  // @ts-ignoregit
  deleteProduct(id:number):Observable<any> {
    console.log("Supprimer ")
    return this.http.delete(this.host+"/SupprimerDon/"+id)



  }

  public deleteResource(url:any) {
    return this.http.delete(url);
  }

  public createDonation(model:Donation):Observable<any> {
    console.log("hhhhhhh")
    return this.http.post(this.host+"/donate",model);



  }

  /*deleteProduct(id: number):Observable<any> {
    return this.http.delete(`http://localhost:8999/Dons/SupprimerDon/${id}`)
      .pipe(
        tap(data => console.log('data', data))

      );
  }*/
 /* getProduct(id: number) {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }*/

  editValue(){
     this.edit=true;
     return this.edit;
  }

  getbyKey(key:any){
    //return this.http.get("https://dummyjson.com/products/search?q="+key)
    return this.http.get(this.host+`/search/${this.id}/${key}`)
  }

 /* updateTask(model:any,id:any){
    return this.http.put("https://dummyjson.com/"+'products' +id, model)
  }*/
  setProduct(res:any){
    this.value=res;
  }

  public editProduct(id:number,value:any) {
    console.log("eeeeddddiiiitttteee")
    return this.http.put(this.host+`/update/${id}`, value)
  }

}
