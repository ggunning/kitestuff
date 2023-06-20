import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ANONYMOUS_CONSENTS_HEADER, OccEndpointsService } from "@spartacus/core";
import { Observable } from "rxjs";

// temporary fix for https://jira.tools.sap/browse/CXEC-14507
@Injectable({ providedIn: 'root' })
export class BasesitesPatchInterceptor implements HttpInterceptor {
    baseSitesEndpoint: string;

    constructor(
        private occEndpoints: OccEndpointsService,
    ) { 
        this.baseSitesEndpoint = `${this.occEndpoints.getBaseUrl()}/basesites`.replace('//basesites','/basesites');
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (this.isBasesitesUrl(request.url)) {
            const req = request.clone({ headers: request.headers.delete(ANONYMOUS_CONSENTS_HEADER) });

            return next.handle(req);

        } else {
            return next.handle(request);
        }
    }

    private isBasesitesUrl(url: string): boolean {
        return url.indexOf(this.baseSitesEndpoint) >= 0;
    }

}