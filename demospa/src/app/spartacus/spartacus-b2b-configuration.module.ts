import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, ProtectedRoutesGuard, provideConfig } from '@spartacus/core';
import { defaultB2bCheckoutConfig, defaultB2bOccConfig, } from '@spartacus/setup';
import { BulkPricingFeatureModule } from './features/bulk-pricing-feature.module';
import {
  organizationTranslationChunksConfig,
  organizationTranslations
} from '@spartacus/organization/administration/assets';
import { ProductConfiguratorFeatureModule } from 'src/app/spartacus/features/product-configurator/product-configurator-feature.module';
import { EarlyLoginProtectedRoutesGuard } from '../guards/early-login-protected-routes.guard';

@NgModule({
  imports: [
    BulkPricingFeatureModule,
    ProductConfiguratorFeatureModule,
  ],
  providers: [
    provideConfig(defaultB2bOccConfig),
    provideConfig(defaultB2bCheckoutConfig),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
      },
    }),

    provideConfig(<CmsConfig> {
      cmsComponents: {
        ProductAddToCartComponent: {
          data: {
            inventoryDisplay: true,
          },
        },
      },
      
    }),
    {
      provide: ProtectedRoutesGuard,
      useClass: EarlyLoginProtectedRoutesGuard,
    },
    //it has to be set on true in order to initialize non-protected paths in ProtectedRoutesService, 
    //whether early login enbaled decided in EarlyLoginProtectedRoutesGuard based on requiresAuthentication property on site
    provideConfig({ routing: { protected: true } }),
  ],
})
export class SpartacusB2bConfigurationModule {
}
