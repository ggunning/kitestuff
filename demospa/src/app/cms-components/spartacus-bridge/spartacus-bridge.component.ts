import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ScriptComponent } from '../../models/spartacus-bridge.model';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QOccService } from '../../../occ/services/q-occ.service';

@Component({
  selector: 'app-spartacus-bridge',
  templateUrl: './spartacus-bridge.component.html',
})
export class SpartacusBridgeComponent implements OnInit, OnDestroy {

  html$: Observable<object>;
  globalHtml: SafeHtml = null;
  subscription: Subscription;

  constructor(
    private qOccService: QOccService,
    private component: CmsComponentData<ScriptComponent>,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.html$ = this.qOccService.getScriptRenderingOutput(this.component.uid);
    this.subscription = this.html$.subscribe(data => {
      this.globalHtml = this.sanitizer.bypassSecurityTrustHtml(data.toString());
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
