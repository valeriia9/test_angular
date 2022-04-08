import { Injectable, EventEmitter } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';
// import * as $ from 'jquery';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * Store all current active requests
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Variable for check loader is already activated or not
   */
  public showLoading: boolean = false;


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    request.headers.append('Cache-Control', 'no-cache');
    request.headers.append('pragma', 'no-cache');

    /**
     * Event before request execution.
     */
    this.onStarted(request);

    /**
     * Event after request execution.
     */
    return next.handle(request).finally(() => this.onFinished(request));
  }



  private onStarted(request: HttpRequest<any>): void {
    debugger
    this.requests.push(request);
    // this.notify();
  }


  private onFinished(request: HttpRequest<any>): void {
    debugger
    const index = this.requests.indexOf(request);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  private notify(): void {
    if (!this.showLoading) {
      this.showLoading = true;
    }
    else if (this.requests.length === 0 && this.showLoading) {
      this.showLoading = false
    }
  }

}
