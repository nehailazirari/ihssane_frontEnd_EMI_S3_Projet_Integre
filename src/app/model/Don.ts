import { EtatDemande } from "../shared/etatDemande";
import { User } from "./User";
import { Category } from "./category";

export class Don{
    favorite = false;
    constructor(public id : number,
        public nom : string,
        public dateCreation : Date,
        public description : string,
        public photo: string,
        public category : Category,
        public donneur: User
        ){

    }
}