
import { User } from "./User";


export class Message {
    public id!:number;
    public message : string;
    public fromUser: User;
    public toUser: User;
    public createdDate : Date;
    public lastSeen: Date;
    public photoProfil : string|undefined;
    constructor(id:number,
        message: string,
        fromUser: User,
        toUser: User,createdDate : Date,lastSeen : Date,photoProfil:string|undefined){
            this.id=id;
            this.message=message;
            this.fromUser=fromUser;
            this.toUser = toUser;
            this.createdDate = createdDate;
            this.lastSeen = lastSeen;
            this.photoProfil=photoProfil;
    }
}
