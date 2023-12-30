import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string="http://localhost:3000/";
  



  constructor(private http:HttpClient) { }

getDataFromServer(endpoint:string,params:HttpParams){
  const url=this.baseUrl+endpoint;
  return this.http.get(url,{params:params});
}



}
