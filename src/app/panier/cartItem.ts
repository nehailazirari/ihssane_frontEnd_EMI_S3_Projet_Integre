import { EtatDemande } from "../shared/etatDemande";

export class CartItem {
    public id: number;
    public name: string;
    public quantity: number;
    public price: number;
    public total: number;
    public image : string;
    public etatDemande : EtatDemande = EtatDemande.encours;
  //   public ingredients: Ingredient[];
  
    constructor(id: number, name: string, quantity: number, price: number,image :string) {
    // constructor(public name: string, public quantity: number, public price: number) {
      this.id = id;
      this.name = name;

      this.quantity = quantity;
      this.price = price;
      this.image =image;
      this.total = this.quantity * this.price;
    }
  }