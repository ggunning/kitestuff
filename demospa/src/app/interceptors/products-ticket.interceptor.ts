import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmartEditLauncherService } from '@spartacus/smartedit/root';
import { Observable } from 'rxjs';
  
  @Injectable({ providedIn: 'root' })
  export class ProductsTicketInterceptor implements HttpInterceptor {
    constructor(private service: SmartEditLauncherService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (this.service.cmsTicketId && !request?.params[this.service.cmsTicketId] && request.url.includes('/products/')) {
        request = request.clone({
          setParams: {
            cmsTicketId: this.service.cmsTicketId,
          },
        });
      }
  
      return next.handle(request);
    }
  }