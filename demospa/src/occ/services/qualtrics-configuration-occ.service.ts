import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualtricsConfigurationOccService {

  constructor(private http: HttpClient,
              private occEndpoints: OccEndpointsService) {
  }

  getQualtricsConfiguration(): Observable<any> {
    const url = this.occEndpoints.getBaseUrl() + `/qualtrics/config`;
    return this.http.get<any>(url);
  }
}
