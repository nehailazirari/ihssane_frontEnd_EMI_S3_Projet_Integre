import { User } from "../model/User";
import { CartItem } from "../model/cartItem";

export class Panier{
    public id! : number;
    public utilisateur!: User;
    public panierBD!: CartItem[];
}