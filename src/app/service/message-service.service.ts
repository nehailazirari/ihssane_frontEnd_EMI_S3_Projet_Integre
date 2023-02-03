import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageUrl = 'http://localhost:8080/messages/';

  constructor(private http: HttpClient) {}

  getMessages(fromUserId: number, toUserId : number): Observable<Message[]> {
    return this.http.get<Message[]>(this.messageUrl+fromUserId+'/'+toUserId);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>("http://localhost:8080/getUsers/"+userId);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messageUrl, message);
  }

  updateMessageSeen(id: number): Observable<Message> {
    return this.http.put<Message>(`${this.messageUrl}/${id}`, { lastSeen: new Date() });
  }
  getUtilisateurs(id:number): Observable<User>{
    
    return this.http.get<User>("http://localhost:8080/messages/users/"+id)
  }
}

