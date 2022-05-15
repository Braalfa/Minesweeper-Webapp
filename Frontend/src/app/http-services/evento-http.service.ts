import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Evento} from "../models/Evento";

@Injectable({
  providedIn: 'root'
})
export class EventoHttpService {

  URL = 'https://localhost:5001/api/evento/'
  constructor(private http: HttpClient) { }

  public getEvento(token: string):Observable<Evento>{
    return this.http.get<Evento>(this.URL+"Token", {params:{token}});
  }

  // public postEvento(evento: ):Observable<Evento>{
  //   return this.http.post<Evento>(this.URL , evento);
  // }
}
