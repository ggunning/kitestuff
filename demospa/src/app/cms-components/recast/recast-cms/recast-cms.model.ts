import { CmsComponent } from '@spartacus/core';

export interface RecastCMSComponentData extends CmsComponent {
  recastSrc?: string;
  recastChannel?: string;
  recastToken?: string;
  recastId?: string;
}
