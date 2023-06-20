import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, UrlTree } from "@angular/router";
import { AuthGuard, BaseSiteService, ProtectedRoutesGuard, ProtectedRoutesService, RoutingConfig } from "@spartacus/core";
import { Observable } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class EarlyLoginProtectedRoutesGuard extends ProtectedRoutesGuard {

    constructor(
        protected service: ProtectedRoutesService,
        protected authGuard: AuthGuard,
        protected routingConfig: RoutingConfig,
        protected baseSiteService: BaseSiteService
    ) {
        super(service, authGuard);
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.baseSiteService.get()
            .pipe(
                filter(baseSite => Boolean(baseSite)),
                tap(baseSite => this.routingConfig.routing.protected = baseSite.requiresAuthentication),
                switchMap(() => super.canActivate(route))
            )
    }
}