export class User {

  id!: number ;
  email: string ;
  nom: string ;
  prenom: string ;
  password: string;
  ville:string;
  tel:string;
  date_de_naissance:string;
  adresse:string;


  constructor(email: string, nom: string, prenom: string, password: string, ville: string, tel: string, date_de_naissance: string, adresse: string) {

    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
    this.ville = ville;
    this.tel = tel;
    this.date_de_naissance=date_de_naissance;
    this.adresse=adresse;

  }



}

