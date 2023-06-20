import { NgModule } from '@angular/core';
import { CartConfig, CmsConfig, provideConfig } from '@spartacus/core';
import { BoostersModule } from '@cx-spartacus/boosters';


@NgModule({
  imports: [
    BoostersModule,
  ],
  providers: [
    provideConfig(<CartConfig>{
      cart: {
        selectiveCart: {
          enabled: true,
        },
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
    })
  ],
})
export class SpartacusB2cConfigurationModule {
}
