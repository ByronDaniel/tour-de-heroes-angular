import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroesHttpService {
  API_URL_HEROES : string = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(url: string, params = new HttpParams()){
    url = this.API_URL_HEROES + url;
    return this.httpClient.get(url,{params});
  }
  store(url: string, data: any, params = new HttpParams()){
    url = this.API_URL_HEROES+ url;
    return this.httpClient.post(url, data, {params});
  }
  update(url: string, data: any, params = new HttpParams()){
    url = this.API_URL_HEROES + url;
    return this.httpClient.put(url, data,{params});
  }
  delete(url: string, ids: any, params = new HttpParams()){
    url = this.API_URL_HEROES + url;
    return this.httpClient.put(url,{ids},{params});
  }
  drop(url:string,id:number, params = new HttpParams()){
    url = this.API_URL_HEROES + url;
    return this.httpClient.delete(url,{params});
  }
}
