import { take } from 'rxjs/operators';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CmsComponentData } from '@spartacus/storefront';
import { RecastCMSComponentData } from './recast-cms.model';


@Component({
  selector: 'app-recast-cms',
  templateUrl: './recast-cms.component.html',
  styleUrls: ['./recast-cms.component.scss']
})
export class RecastCmsComponent implements OnInit {

  constructor(
    public componentData: CmsComponentData<RecastCMSComponentData>,
    protected elementRef: ElementRef,
    protected router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeToComponentData();
  }

  subscribeToComponentData() {
    this.componentData.data$
      .pipe(take(1))
      .subscribe(data => this.prepareRecastScript(data));
  }

  prepareRecastScript(data: RecastCMSComponentData) {
    let recastScript = this.renderRecastScript(data);
    this.appendRecastScriptToDOM(recastScript);
  }

  renderRecastScript(data: RecastCMSComponentData): any {
    let recastScript = document.createElement('script');
    recastScript.setAttribute('type', 'text/javascript');
    recastScript.setAttribute('src', data.recastSrc);
    recastScript.setAttribute('channelId', data.recastChannel);
    recastScript.setAttribute('token', data.recastToken);
    recastScript.setAttribute('id', data.recastId);

    return recastScript;
  }

  appendRecastScriptToDOM(recastScript: any) {
    this.elementRef.nativeElement.appendChild(recastScript);
  }
}
