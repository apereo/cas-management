import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceInterceptor implements HttpInterceptor {

  @Output()
  call: EventEmitter<void> = new EventEmitter<void>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.call.emit();
    return next.handle(req);
  }

}
