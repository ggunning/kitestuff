import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { QualtricsLoaderService } from '@spartacus/qualtrics/components';
import { ScriptLoader, WindowRef } from '@spartacus/core';
import { QualtricsConfigurationOccService } from '../../../occ/services/qualtrics-configuration-occ.service';

@Injectable({
  providedIn: 'root'
})
export class YdcspartacusQualtricsLoaderService extends QualtricsLoaderService {

  private renderer: Renderer2;

  constructor(protected winRef: WindowRef,
              @Inject(PLATFORM_ID) protected platformId: any,
              protected scriptLoader: ScriptLoader,
              protected rendererFactory: RendererFactory2,
              protected qualtricsConfigurationOccService: QualtricsConfigurationOccService) {
    super(winRef, platformId, scriptLoader);

    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  addScript(scriptSource: string): void {
    if (this.hasScript(scriptSource)) {
      this.run(true);
    } else {
      this.qualtricsConfigurationOccService.getQualtricsConfiguration().subscribe(data => {
        if (data.enabled) {
          const configuration: HTMLScriptElement = this.renderer.createElement('script');
          configuration.type = 'text/javascript';
          configuration.defer = true;
          configuration.text = '' +
            'const qualtricsProjectId=\'' + data.projectId + '\';\n' +
            'const qualtricsEnv=\'' + data.projectId + '-' + data.brandId + '\';';
          this.renderer.appendChild(this.winRef.document.body, configuration);

          this.scriptLoader.embedScript({
            src: scriptSource,
          });
        }
      });
    }
  }
}
