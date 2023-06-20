import {isPlatformBrowser} from '@angular/common';
import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {AuthService, BaseSiteService, LanguageService, ScriptLoader, WindowRef} from '@spartacus/core';
import {combineLatest, ReplaySubject, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {CdcAuthFacade, CdcConfig, CdcJsService} from '@spartacus/cdc/root';
import {CdcConfigurationOccService} from '../../../occ/services/cdc-configuration-occ.service';
import {UserProfileFacade} from '@spartacus/user/profile/root';


@Injectable({
  providedIn: 'root',
})
export class YdcspartacusCdcJsService extends CdcJsService {
  protected loaded$ = new ReplaySubject<boolean>(1);
  protected errorLoading$ = new ReplaySubject<boolean>(1);
  protected subscription: Subscription = new Subscription();

  constructor(
    protected cdcConfig: CdcConfig,
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService,
    protected scriptLoader: ScriptLoader,
    protected winRef: WindowRef,
    protected cdcAuth: CdcAuthFacade,
    protected auth: AuthService,
    protected zone: NgZone,
    protected userProfileFacade: UserProfileFacade,
    @Inject(PLATFORM_ID) protected platform: any,
    protected cdcConfigurationOccService: CdcConfigurationOccService
  ) {
    super(cdcConfig, baseSiteService, languageService, scriptLoader, winRef, cdcAuth, auth, zone, userProfileFacade, platform);
  }

  loadCdcJavascript(): void {
    // Only load the script on client side (no SSR)
    if (isPlatformBrowser(this.platform)) {
      this.subscription.add(
        combineLatest([
          this.baseSiteService.getActive(),
          this.languageService.getActive(),
          this.cdcConfigurationOccService.getCDCConfiguration()
        ])
          .pipe(take(1))
          .subscribe(([baseSite, language, configuration]) => {
            const scriptForBaseSite = this.getJavascriptUrl(configuration);
            if (scriptForBaseSite) {
              const javascriptUrl = `${scriptForBaseSite}&lang=${language}`;
              this.scriptLoader.embedScript({
                src: javascriptUrl,
                params: undefined,
                attributes: {type: 'text/javascript'},
                callback: () => {
                  this.registerEventListeners(baseSite);
                  this.loaded$.next(true);
                },
                errorCallback: () => {
                  this.errorLoading$.next(true);
                },
              });
              this.winRef.nativeWindow['__gigyaConf'] = {include: 'id_token'};
            }
          })
      );
    }
  }

  public getJavascriptUrl(configuration: any): string {
    const apiKey = configuration.apiKey;
    const dataCenter = configuration.dataCenter;
    return apiKey && dataCenter ? `https://cdns.${dataCenter}/JS/gigya.js?apikey=${apiKey}` : '';
  }
}
