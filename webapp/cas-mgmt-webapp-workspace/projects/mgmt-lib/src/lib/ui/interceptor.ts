import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Service used to intercept all http request and emits an event to track user activity.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceInterceptor implements HttpInterceptor {

  @Output()
  call: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Implemented method to intercept any http request to the server.
   *
   * @param req - HttpRequest
   * @param next - HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.call.emit();
    return next.handle(req);
  }

}
