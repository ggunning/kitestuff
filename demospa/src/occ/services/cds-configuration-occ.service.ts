import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CdsConfigurationOccService {

  constructor(private http: HttpClient,
              private occEndpoints: OccEndpointsService) {
  }

  getCDSConfiguration(): Observable<any> {
    const url = this.occEndpoints.getBaseUrl() + `/cds/configuration`;
    return this.http.get<any>(url);
  }
}
