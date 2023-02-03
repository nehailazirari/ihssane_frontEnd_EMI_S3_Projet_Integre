import { Component, Input, OnInit } from '@angular/core';
import { Notify } from '../../../model/notify';
import { CartService } from '../../../service/cart.service';
import { EtatDemande } from '../../../shared/etatDemande';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { User } from 'app/model/User';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isDisabled= false;
  @Input() notification! : Notify;
 
  constructor(private panierService: CartService, private route: Router) { }

  ngOnInit(): void {
    
  }
  
  updatePanierDbAccepter(){
    this.isDisabled=!this.isDisabled;
    this.panierService.updatePanierBD(this.notification.panierBD.id,EtatDemande.accepter).subscribe((res)=>{

    })
  }
  updatePanierDbRefuser(){
    
    console.log();
    
    this.panierService.updatePanierBD(this.notification.panierBD.id,EtatDemande.refuser).subscribe((res)=>{
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.route.navigate(['/panier']));
      this.isDisabled=!this.isDisabled;
    })
  }
}
