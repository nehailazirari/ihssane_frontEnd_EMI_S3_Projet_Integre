import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import {NavigationEnd,Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import { Notify } from 'app/model/notify';
import { NotifyService } from 'app/service/notify-service.service';
import { User } from 'app/model/User';
import { MatDialog } from '@angular/material/dialog';
import { ListDonationsService } from 'app/service/list-donations.service';
import { NewDonationComponent } from 'app/Utilisateur/new-donation/new-donation.component';

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
  products: any;
  constructor(public dialog: MatDialog,private donationService:ListDonationsService,private userService:AuthService ,private localStorageService: LocalStorageService,private router:Router,private notifyService : NotifyService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.ConnectedUser();
    this.notifyService.getAll(this.currentUser.id).subscribe((reponse)=>{
      this.notifications = reponse;
      
    })

  }

  logout() {
    this.localStorageService.removeItem("user_connecte");
    this.isConnected=!this.isConnected;
    this.router.navigate([''])

  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  getProducts(){

    this.donationService.getAllDonations().
    subscribe((res:any)=>{

        this.products=res
        console.log("imaaaaaaage "+this.products[1].photo);
      },
      error =>{


        alert(error.message);

      });
    //console.log(this.products);

  }

  addDonation() {

    const dialogRef2 = this.dialog.open(NewDonationComponent, {
      //height: '600px',
      width: '750px',
      //data:p
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.getProducts();
    });
  }

}
