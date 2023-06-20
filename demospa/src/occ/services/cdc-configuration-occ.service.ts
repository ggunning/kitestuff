import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService, CurrencyService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { mergeMap, take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CdcConfigurationOccService {

  constructor(private http: HttpClient,
              private occEndpoints: OccEndpointsService,
              private currencyService: CurrencyService) {
  }

  getCDCConfiguration(): Observable<any> {

    return this.currencyService.getActive().pipe(
      take(1),
      delay(1), //make sure that SiteContextInterceptor updates first
      mergeMap(_ => {
        const url = this.occEndpoints.getBaseUrl() + `/gigya/configuration`;
        return this.http.get(url);
      })
    );

  }
}
