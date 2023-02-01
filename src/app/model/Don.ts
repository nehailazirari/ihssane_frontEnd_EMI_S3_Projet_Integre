import { EtatDemande } from "../shared/etatDemande";

export class Don{
    favorite = false;
    
    constructor(public id : number,
        public title : string,
        public price : number,
        public description : string,
        public category : string,
        public image : string){

    }
}