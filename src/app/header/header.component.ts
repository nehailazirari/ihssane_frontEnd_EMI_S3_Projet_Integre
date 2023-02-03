import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import {NavigationEnd,Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import { Notify } from 'app/model/notify';
import { NotifyService } from 'app/service/notify-service.service';
import { User } from 'app/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected:boolean=this.userService.isAuthenticatedSet()

  isOpen = false;
  
  notifications! : Notify[];

  
  currentUser!: User;
  constructor(private userService:AuthService ,private localStorageService: LocalStorageService,private router:Router,private notifyService : NotifyService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.ConnectedUser();
    this.notifyService.getAll(this.currentUser.id).subscribe((reponse)=>{
      this.notifications = reponse;
      
    })

  }

  logout() {
    this.localStorageService.removeItem("user_connecte");
    this.router.navigate([''])

  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

}
