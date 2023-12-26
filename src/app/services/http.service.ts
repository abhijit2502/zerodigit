import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string="http://localhost:3000/";
  



  constructor(private http:HttpClient) { }

getDataFromServer(endpoint:string){
  const url=this.baseUrl+endpoint;
  return this.http.get(url);
}



}
