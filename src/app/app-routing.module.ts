import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './catalogue/product-list/product-list.component';
import { PanierComponent } from './panier/panier.component';
import { ProfilComponent } from './Utilisateur/profil/profil.component';
import {InscriptionComponent} from "./Utilisateur/Autentification/inscription/inscription.component";
import {LoginComponent} from "./Utilisateur/Autentification/login/login.component";
import {ParametresComponent} from "./Utilisateur/parametres/parametres.component";
import {FavoriesComponent} from "./favories/favories.component";
import {AuthentificationGuard} from "./authentification.guard";
import {AppComponent} from "./app.component";
import {DetailDonComponent} from "./detail-don/detail-don.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 /* {path: 'catalogue', component:ProductListComponent,canActivate:[AuthentificationGuard] },
  {path: 'catalogue/:id', component: DetailDonComponent,canActivate:[AuthentificationGuard] },
  {path: 'panier', component: PanierComponent,canActivate:[AuthentificationGuard]},
  {path: '', component:HomeComponent},
  { path: 'Profil', component: ProfilComponent,canActivate:[AuthentificationGuard]},
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Parametres', component: ParametresComponent,canActivate:[AuthentificationGuard]},
  { path: 'Favories', component: FavoriesComponent,canActivate:[AuthentificationGuard]},*/

  {path: 'catalogue', component:ProductListComponent },
  {path: 'catalogue/:id', component: DetailDonComponent },
  {path: 'panier', component: PanierComponent},
  {path: '', component:HomeComponent},
  { path: 'Profil', component: ProfilComponent},
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Parametres', component: ParametresComponent},
  { path: 'Favories', component: FavoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
