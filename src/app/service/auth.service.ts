import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {LocalStorageService} from "./local-storage.service";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email!:string ;
  updateProfile!:boolean;

  constructor(private http: HttpClient ,private localStorageService: LocalStorageService,private router:Router) {

  }



  public login(email: string,password:string): Observable<User> {

    let content: any = {};
    content.email = email;
    content.password=password;

    return this.http.post<User>('http://localhost:8080/login', content);

  }


  public register(user: User):Observable<any> {

    return this.http.post<any>('http://localhost:8080/register', user)
  }

  //Pour vérifier lors de l'inscription et la connexion

  public doesEmailExist(email: string): Observable<User> {

    let content: any = {};
    content.email = email;
    let response: Observable<User> = this.http.post<User>('http://localhost:8080/users/emailcheck', content);
    return response;
  }



  ConnectedUser():User{
    let User_connecte:User= JSON.parse(this.localStorageService.getItem("user_connecte"));
    return User_connecte;
  }


  Supprimer_Compte(Userid:number) :Observable<any>{
    return this.http.delete('http://localhost:8080/users/'+ Userid);

  }


  isAuthenticatedSet():boolean{
    let a:boolean
    if(this.ConnectedUser()!=null) {a=true}
    else{ a=false}
    return a;

  }

  //Favories

  Afficher_Favorie_utilisateur(Userid:number) :Observable<any>{
    return this.http.get('http://localhost:8080/favories/'+ Userid);
  }

  Ajouter_Favorie_utilisateur(Userid:number,DonId:number):Observable<any>{
    return this.http.post('http://localhost:8080/addfavorie/'+Userid+'/'+DonId,{});

  }
  Supprimer_Favorie_utilisateur(Userid:number,DonId:number):Observable<any>{
    return this.http.delete('http://localhost:8080/deleteFavorie/'+Userid+'/'+DonId);
  }


}
