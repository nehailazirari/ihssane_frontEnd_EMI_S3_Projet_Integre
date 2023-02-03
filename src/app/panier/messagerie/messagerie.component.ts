import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../service/message-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/User';
import { Message } from '../../model/message';


@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {

  private routeSub?: Subscription;
  id : number=1;
  users1 : User[]=[];
  users: User[]=[];
  fromUser!:User;
  toUser!:User;
  messages: Message[]=[];
  autherId: number=0;
  inclode: boolean= false;
  chine :string ="";
  message!:Message;
  heaserUser!:User;

  constructor(private messageService: MessageService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    /*this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['UserId'];
      
    });*/
    this.messageService.getUtilisateurs(1).subscribe((response:any) => {
      this.users1= response;
      if(this.users1 && this.users1.length > 0){
      for(let user1 of this.users1){
        for(let user of this.users){
          if(user1.id==user.id){
            this.inclode=true
          }
        }
        if(!this.inclode){
        this.users.push(user1);
        
      }this.inclode=false;
    } 
     }
    },(err='yy') => {
      console.log(err);
    });
    

   
    
  }
  onClik(id : number){
    this.autherId=id;
    this.messageService.getMessages(this.id,id).subscribe((reponse:any)=>{

      this.messages=reponse;
    })
    for(let user of this.users){
      if(user.id==this.autherId){
        this.heaserUser = user;
      }
    }
  }

  onSend(){
  this.messageService.getUser(this.id).subscribe((reponse : any)=>{
    this.fromUser=reponse;
    
    
    
  })
  this.messageService.getUser(this.autherId).subscribe((reponse : any)=>{
    this.toUser=reponse;
    
  })
  if(this.fromUser&&this.toUser){
   this.message = new Message(5,this.chine,this.fromUser,this.toUser,new Date(),new Date())
   this.chine=''
   if(this.message){
    this.messageService.sendMessage(this.message).subscribe((res)=>{
    
    
    this.onClik(this.autherId);

   })}

  }

  }


}
