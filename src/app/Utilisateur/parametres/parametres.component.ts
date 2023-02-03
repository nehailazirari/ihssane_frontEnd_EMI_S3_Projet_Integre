import { Component, OnInit } from '@angular/core';

import {LocalStorageService} from "../../service/local-storage.service";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";


@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  UserParametre!: User;

  constructor(private userservice: AuthService,private localStorageService: LocalStorageService,private router:Router) {
  }

  ngOnInit(): void {
    this.UserParametre = this.userservice.ConnectedUser()
  }

  Supprimer_Compte() {
    if (confirm("Voulez vous supprimer le compte !")) {
      this.userservice.Supprimer_Compte(this.UserParametre.id).subscribe()
      this.localStorageService.removeItem("user_connecte");
      this.router.navigate(['']);
      alert("votre compte a été supprimé")
    }
  }


}
