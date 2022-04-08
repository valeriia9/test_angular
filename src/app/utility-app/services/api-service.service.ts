import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get(requestUrl): Observable<any> {
    return this.httpClient.get(requestUrl);
  }

  post(requestUrl, requestObj): Observable<any> {
    return this.httpClient.post(requestUrl, requestObj, this.httpOptions);
  }

  put(requestUrl, requestObj): Observable<any> {
    return this.httpClient.put(requestUrl, requestObj, this.httpOptions);
  }

  deleteById(requestUrl): Observable<any> {
    return this.httpClient.delete(requestUrl, this.httpOptions);
  }
}