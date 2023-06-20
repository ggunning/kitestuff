import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class QOccService {

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {
  }

  getScriptRenderingOutput(componentUid) {
    const params = { componentUid };

    const url = this.occEndpoints.getBaseUrl() + `/q/render`;
    return this.http.get(url, { params });
  }
}
