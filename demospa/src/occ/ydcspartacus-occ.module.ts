import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CdsConfigurationOccService} from './services/cds-configuration-occ.service';
import {QualtricsConfigurationOccService} from './services/qualtrics-configuration-occ.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CdsConfigurationOccService,
    QualtricsConfigurationOccService
  ]
})
export class YdcspartacusOccModule {
}
