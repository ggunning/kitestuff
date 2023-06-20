import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QualtricsLoaderService} from '@spartacus/qualtrics/components';
import {YdcspartacusQualtricsLoaderService} from './ydcspartacus-qualtrics-loader.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: QualtricsLoaderService, useClass: YdcspartacusQualtricsLoaderService
    }
  ]
})
export class YdcspartacusQualtricsModule {
}
