import { Don } from "./Don";
import { EtatDemande } from "../shared/etatDemande";

export class CartItem {
    public id!: number;
    public don: Don;
    public etatDemande : EtatDemande;
  //   public ingredients: Ingredient[];
  
    constructor(don:Don,etatDemande: EtatDemande) {
    // constructor(public name: string, public quantity: number, public price: number) {
      this.don=don;
      this.etatDemande =etatDemande;
    }
  }