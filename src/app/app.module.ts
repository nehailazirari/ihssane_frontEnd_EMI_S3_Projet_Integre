import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { EditProductComponent } from './edit-product/edit-product.component';
/*import { EditDonationComponent } from './edit-donation/edit-donation.component';
import { NewDonationComponent } from './new-donation/new-donation.component';*/
import { DonationsComponent } from './Utilisateur/donations/donations.component';
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { EditDonationComponent } from './Utilisateur/edit-donation/edit-donation.component';
import {MaterialModule} from "./material/material.module";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import { NewDonationComponent } from './Utilisateur/new-donation/new-donation.component';
import {HeaderComponent} from "./header/header.component";
import {ProductService} from "./service/product.service";
import {CartService} from "./service/cart.service";
import {LocalStorageService} from "./service/local-storage.service";
import {ProductItemComponent} from "./catalogue/product-item/product-item.component";
import {CartItemComponent} from "./panier/cart-item/cart-item.component";
import {PanierComponent} from "./panier/panier.component";
import {MessagerieComponent} from "./panier/messagerie/messagerie.component";
import {InscriptionComponent} from "./Utilisateur/Autentification/inscription/inscription.component";
import {LoginComponent} from "./Utilisateur/Autentification/login/login.component";
import {ProfilComponent} from "./Utilisateur/profil/profil.component";
import {ParametresComponent} from "./Utilisateur/parametres/parametres.component";
import {FavoriesComponent} from "./favories/favories.component";
import {DetailDonComponent} from "./detail-don/detail-don.component";
import {HomeComponent} from "./home/home.component";
import {ProductListComponent} from "./catalogue/product-list/product-list.component";
import {CartComponent} from "./panier/cart/cart.component";
import {AuthentificationGuard} from "./authentification.guard";

export const DIALOG_DATA = new InjectionToken<any>('DialogData');
@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    HeaderComponent,
    PanierComponent,
    MessagerieComponent,
    InscriptionComponent,
    LoginComponent,
    ProfilComponent,
    ParametresComponent,
    FavoriesComponent,
    DetailDonComponent,
    HomeComponent,
    DonationsComponent,
    EditDonationComponent,
    NewDonationComponent,
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        RouterLink,
        HttpClientModule,
        RouterModule.forRoot([
          {path: 'catalogue', component:ProductListComponent,canActivate:[AuthentificationGuard] },
          {path: 'catalogue/:id', component: DetailDonComponent,canActivate:[AuthentificationGuard] },
          {path: 'panier', component: PanierComponent,canActivate:[AuthentificationGuard]},
          {path: '', component:HomeComponent},
          { path: 'Profil', component: ProfilComponent,canActivate:[AuthentificationGuard]},
          { path: 'inscription', component: InscriptionComponent },
          { path: 'login', component: LoginComponent },
          { path: 'Parametres', component: ParametresComponent,canActivate:[AuthentificationGuard]},
          { path: 'Favories', component: FavoriesComponent,canActivate:[AuthentificationGuard]},
            {
                path: "donations",
                component: DonationsComponent
            },
             {
               path:"new-donation",
               component:NewDonationComponent
             },
            {
                path: "edit-donation/:id",
                component: EditDonationComponent
            },
          {
            path: "new-donation/",
            component: NewDonationComponent
          },
            {
                path: "",
                redirectTo: "/donations", pathMatch: 'full'
            }
        ]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
