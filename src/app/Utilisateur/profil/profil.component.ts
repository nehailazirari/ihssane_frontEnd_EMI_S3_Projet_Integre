import {Component, Input, OnInit, Output} from '@angular/core';

import {User} from "../../model/user";
import {LocalStorageService} from "../../service/local-storage.service";
import {AuthService} from "../../service/auth.service";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  UserProfile!:User;
   value!:string;
  updateProfile=false;

  constructor(private userService: AuthService) {

  }

  ngOnInit(): void {

    this.UserProfile = this.userService.ConnectedUser();



  }


  annuler(){
    this.updateProfile= false;
  }
}
