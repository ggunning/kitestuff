import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { SmartEditRootModule } from '@spartacus/smartedit/root';

@NgModule({
  declarations: [],
  imports: [
    SmartEditRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      smartEdit: {
        module: () => import('@spartacus/smartedit').then((m) => m.SmartEditModule)
      }
    }
  }),
    provideConfig(
      {
        smartEdit: {
          storefrontPreviewRoute: 'cx-preview',
          allowOrigin: 'localhost:9002, *.demo.hybris.com:443, *.usdemo.hybris.com:443, *.gcdemo.hybris.com:443, *.apjdemo.hybris.com:443, backoffice.*.model-t.cc.commerce.ondemand.com:443'
        }
      }
    )]
})
export class SmartEditFeatureModule {
}
