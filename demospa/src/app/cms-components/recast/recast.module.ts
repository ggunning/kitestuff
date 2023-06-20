import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { RecastCmsComponent } from './recast-cms/recast-cms.component';

@NgModule({
  declarations: [RecastCmsComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RecastCMSComponent: {
          component: RecastCmsComponent
        }
      }
    })
  ],
  exports: [RecastCmsComponent],
  entryComponents: [RecastCmsComponent]
})
export class RecastModule { }
