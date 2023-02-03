import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notify } from '../model/notify';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http : HttpClient) { }

  getAll(idDonneur:number):   Observable<Notify[]>{
    return this.http.get<Notify[]>("http://localhost:8080/notification/getALL/"+idDonneur);

  }
  sendNotify(notification : Notify): Observable<Notify>{
    return this.http.post<Notify>("http://localhost:8080/notification",notification);
  }
  
}
