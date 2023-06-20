import { NgModule } from '@angular/core';
import { CdcConfig, CdcJsService, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
import { provideConfig } from '@spartacus/core';
import { YdcspartacusCdcJsService } from './ydcspartacus-cdc-js.service';


@NgModule({
  declarations: [],
  imports: [
    CdcRootModule
  ],
  providers: [
    provideConfig({
      featureModules: {
        [CDC_FEATURE]: {
          module: () => import('@spartacus/cdc').then((m) => m.CdcModule),
        },
      },
    }),
    provideConfig(<CdcConfig>{
      cdc: [
        {
          baseSite: '',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
      ],
    }),
    {
      provide: CdcJsService, useClass: YdcspartacusCdcJsService
    }
  ]
})
export class CdcconfigurationModule {
}