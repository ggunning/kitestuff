import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CurrencyService, FeaturesConfig, I18nConfig, OccConfig, provideConfig, SiteContextConfig } from '@spartacus/core';
import { defaultCmsContentProviders, layoutConfig, mediaConfig, OnNavigateConfig, PWAModuleConfig, } from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import { DeliveryModePreferences } from '@spartacus/checkout/root';
import { SpartacusB2bConfigurationModule } from './spartacus-b2b-configuration.module';
import { SpartacusB2cConfigurationModule } from './spartacus-b2c-configuration.module';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { CdsConfigurationFacade } from '../../occ/facades/cds-configuration.facade';
import { delay, take } from 'rxjs/operators';


let SpartacusEnvironmentConfigurationModule = SpartacusB2cConfigurationModule;

if (environment.b2bSite) {
  SpartacusEnvironmentConfigurationModule = SpartacusB2bConfigurationModule;
}

function cdsInit(cdsConfigurationFacade: CdsConfigurationFacade, currencyService: CurrencyService) {
  return () => {
    currencyService.getActive().pipe(
      take(1),
      delay(1), //make sure that SiteContextInterceptor updates first
    ).subscribe(_ => {
      cdsConfigurationFacade.loadCdsConfig()
    })
  }
}

@NgModule({
  imports: [
    SpartacusEnvironmentConfigurationModule,
  ],
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          ...environment.occ,
          endpoints: {
            baseSites:
              'basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)),theme,defaultPreviewCatalogId,defaultPreviewCategoryCode,defaultPreviewProductCode,requiresAuthentication)'
          }
        }
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '*',
        consignmentTracking: true
      }
    }),
    // https://sap.github.io/spartacus-docs/scroll-position-restoration/
    provideConfig(<OnNavigateConfig>{
        enableResetViewOnNavigate: {
            // active: false,
            ignoreQueryString: true,
            ignoreRoutes: ['Open-Catalogue', 'product'],
        }
    }),
    provideConfig({
      personalization: {
        enabled: true,
      },
      view: {
        // https://sap.github.io/spartacus-docs/infinite-scroll/
        infiniteScroll: {
          active: true,
          productLimit: 500,
          showMoreButton: false,
        },
      },
      // https://sap.github.io/spartacus-docs/express-checkout/
      checkout: {
        express: true,
        defaultDeliveryMode: [DeliveryModePreferences.LEAST_EXPENSIVE],
      }
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
    }),
    provideConfig(<PWAModuleConfig>{
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: cdsInit,
      multi: true,
      deps: [CdsConfigurationFacade, CurrencyService]
    },

    
  ],
})
export class SpartacusConfigurationModule {
}
