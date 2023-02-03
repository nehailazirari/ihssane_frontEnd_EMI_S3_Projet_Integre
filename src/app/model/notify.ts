import { CartItem } from "./cartItem";
import { User } from "./User";

export class Notify {

    constructor(public id: number,public recuperateur:User,public panierBD: CartItem){

    }
}
