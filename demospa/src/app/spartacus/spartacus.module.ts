import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { SpartacusFeaturesModule } from './spartacus-features.module';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';

@NgModule({
  imports: [
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    BaseStorefrontModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModule {
}
