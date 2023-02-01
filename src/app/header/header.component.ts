import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import {NavigationEnd,Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected:boolean=this.userService.isAuthenticatedSet()


  constructor(private userService:AuthService ,private localStorageService: LocalStorageService,private router:Router) { }

  ngOnInit(): void {


  }

  logout() {
    this.localStorageService.removeItem("user_connecte");
    this.router.navigate([''])

  }


}
