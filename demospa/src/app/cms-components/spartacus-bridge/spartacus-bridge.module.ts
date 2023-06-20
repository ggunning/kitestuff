import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpartacusBridgeComponent } from './spartacus-bridge.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '@spartacus/storefront';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ScriptComponent: {
          component: SpartacusBridgeComponent
        }
      }
    }),
    I18nModule,
  ],
  declarations: [
    SpartacusBridgeComponent
  ],
  entryComponents: [SpartacusBridgeComponent],
  exports: [SpartacusBridgeComponent]
})
export class SpartacusBridgeModule { }
