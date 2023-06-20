import {CmsComponent} from '@spartacus/core';

export class ContentResource {
  code: string;
  name: string;
  content: string;
}

// tslint:disable-next-line:no-empty-interface
export class ScriptResource extends ContentResource { }

export enum ScriptLanguage { }

export enum ScriptReportLevel {
  OFF = 'OFF',
  ERROR = 'ERROR',
  INFO = 'INFO'
}

export class RunnableScript extends ScriptResource {
  language: ScriptLanguage;
  level: ScriptReportLevel;
  limit: number;
}

// tslint:disable-next-line:no-empty-interface
export interface BindingScript extends RunnableScript { }

export interface ItemCollection {
  values: any[];
}

export class ScriptBinding implements CmsComponent {
  code: string;
  name: string;
  script: BindingScript;
  scriptItems: ItemCollection;
  // scriptVariables: Map<string, string>;
  scriptVariablesPrivate: Map<string, string>;
}

export class ViewRenderer extends RunnableScript { }

export class ViewTemplate extends ContentResource {
  renderer: ViewRenderer;
}

export class ComponentTemplate extends ViewTemplate {}

export class ComponentBinding extends ScriptBinding {
  template: ComponentTemplate;
  templateVariables: Map<string, string>;
  templateVariablesPrivate: Map<string, string>;
}

export interface ScriptComponent extends CmsComponent {
  binding: any;
  scriptItems: any;
  scriptVariables: any;
  templateVariables: any;
}
