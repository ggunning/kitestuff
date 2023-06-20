import { Injectable } from '@angular/core';
import { CdsConfigurationOccService } from '../services/cds-configuration-occ.service';
import { BaseSiteService, EventService, PageType } from '@spartacus/core';
import { CdsConfig } from '@spartacus/cds';
import { delay, filter, switchMap, take, tap } from 'rxjs/operators';
import { NavigationEvent } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root'
})
export class CdsConfigurationFacade {

  private configuration = undefined;

  constructor(
    protected config: CdsConfig, 
    protected cdsConfigurationOccService: CdsConfigurationOccService,
    protected baseSiteService: BaseSiteService,
    protected eventService: EventService
  ) {
    this.eventService.get(NavigationEvent)
      .pipe(
        filter(pageEvent => pageEvent.context.type === PageType.PRODUCT_PAGE),
        take(1)
      )
      .subscribe(() => this.updateCdsConfig())
    
    this.eventService.get(NavigationEvent)
      .pipe(take(1))
      .subscribe(pageEvent => {
        if (pageEvent.context.type !== PageType.PRODUCT_PAGE) {
          this.updateCdsConfig()
        }
      })
  }

  private updateCdsConfig() {
    this.config.cds.baseUrl = this.configuration.baseUrl;
    this.config.cds.tenant = this.configuration.tenant;
    this.config.cds.profileTag.configUrl = this.configuration.profileTag?.configUrl;
    this.config.cds.profileTag.javascriptUrl = this.configuration.profileTag?.javascriptUrl;
  }

  public loadCdsConfig() {
    return this.baseSiteService.getActive()
      .pipe(
        filter(Boolean),
        switchMap(_ => this.cdsConfigurationOccService.getCDSConfiguration()),
        take(1)
      )
      .toPromise()
      .then(configuration => this.configuration = configuration)
  }
}
