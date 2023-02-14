import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../service/message-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/User';
import { Message } from '../../model/message';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'app/service/auth.service';





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
  photos: Map<string,string> =new Map<string, string>();
  result:any;
  currentUser!: User;
   nameAgeMapping = new Map<string, any>();;

  

  constructor(private messageService: MessageService, private authService: AuthService) {}


  ngOnInit(): void {
    /*this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['UserId'];
      
    });*/
    
    
    

    this.currentUser = this.authService.ConnectedUser();
    this.id=this.authService.ConnectedUser().id;

    if(this.currentUser)this.messageService.getUtilisateurs(this.currentUser.id).subscribe((response:any) => {
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

    this.messageService.getAllPhoto().subscribe((res)=>{
      

      

      this.photos = new Map(Object.entries(res));
      console.log(this.photos);
    })

    },(err='yy') => {
      console.log(err);
    }
    );
    

   
    
  }
  onClik(id : number){
    this.autherId=id;
    this.messageService.getMessages(this.id,id).subscribe((reponse:any)=>{

      this.messages=reponse;
      console.log(this.messages);
      
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
  if(this.fromUser&&this.toUser&& this.photos){
   this.message = new Message(5,this.chine,this.fromUser,this.toUser,new Date(),new Date(),this.photos.get(this.toUser.id.toString()))
   this.chine=''
   if(this.message){
    this.messageService.sendMessage(this.message).subscribe((res)=>{
    
    
    this.onClik(this.autherId);

   })}

  }

  }

  

}
