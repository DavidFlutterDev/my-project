import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClInputProperties, ClInputType, ClSelectProperties, ClRadioProperties, ClDisplay, ClLabelProperties,
  ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties } from "@clay/ui-components/containers";

@Injectable()
export class HttpClientProcessorService {

  headers: any[]= [];
  metadataIncludePatterns: string[] = [];
  extractHeaderIncludePatterns: string[] = [];
  extractHeaderIncludePrefixes: string[] = [];

  public dynamicFieldsChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  addMoreHeaders(){
    this.headers.push({header_name: '', value: ''});
    this.dynamicFieldsChange.emit();
  }

  addMoreMetadataPatterns(){
    this.metadataIncludePatterns.push('');
    this.dynamicFieldsChange.emit();
  }

  addMoreExtractPatterns(){
    this.extractHeaderIncludePatterns.push('');
    this.dynamicFieldsChange.emit();
  }
  addMoreExtractPrefixes(){
    this.extractHeaderIncludePrefixes.push('');
    this.dynamicFieldsChange.emit();
  }

  public form_8FormValue = signal<any>({basic_auth: {enabled: false, username: "", password: ""}});

  public urlProperties: ClInputProperties = {
    "id": `url`, "label": `Url`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter url`,
  };
  public verbProperties: ClSelectProperties = {
    "id": `verb`, "label": `Verb`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "Post", "value": "POST" }, { "text": "Put", "value": "PUT" }, { "text": "Delete", "value": "DELETE", "hidden": false }, { "text": "Get", "value": "GET", "hidden": false }], "placeholder": `Select verb`,
  };
  public timeOutProperties: ClInputProperties = {
    "id": `timeOut`, "label": `Timeout`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter timeout`, "suffixLabel": `secs`,
  };
  public retryPeriodProperties: ClInputProperties = {
    "id": `retryPeriod`, "label": `Retry period`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter retry period`, "suffixLabel": `secs`,
  };
  public maxRetryPeriodProperties: ClInputProperties = {
    "id": `maxRetryPeriod`, "label": `Max retry period`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter max retry period`, "suffixLabel": `secs`,
  };
  public retriesProperties: ClInputProperties = {
    "id": `retries`, "label": `Retries`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter retires`,
  };
  public propagateResponseRadioProperties: ClRadioProperties = {
    "id": `propagateResponseRadio`, "label": `Propagate response`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public headersProperties: ClLabelProperties = {
    "id": `headers`, "label": `Headers`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };


  public addMoreHeadersButtonProperties: ClButtonProperties = {
    "id": `addMoreHeadersButton`, "label": `Add header`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreHeaders.bind(this)
  };
  public metaDataProperties: ClLabelProperties = {
    "id": `metaData`, "label": `Metadata`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };


  public addMorePatternsProperties: ClButtonProperties = {
    "id": `addMorePatterns`, "label": `Add include patterns`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreMetadataPatterns.bind(this)
  };


  public basicAuthAccordionProperties: ClAccordionProperties = {
    "id": `basicAuthAccordion`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public basicAuthAccordionBasicauthHeaderProperties = {
    "label": `Basic auth`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };

  public basicAuthRadioProperties: ClRadioProperties = {
    "id": `basicAuthRadio`, "label": `basic auth`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public usernameProperties: ClInputProperties = {
    "id": `username`, "label": `Username`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter username`,
  };
  public passwordProperties: ClInputProperties = {
    "id": `password`, "label": `Password`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter password`,
  };
  public ExtracctHeadersProperties: ClAccordionProperties = {
    "id": `ExtracctHeaders`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public ExtracctHeadersExtractheadersHeaderProperties = {
    "label": `Extract  headers`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };
  public includePatternsProperties: ClLabelProperties = {
    "id": `includePatterns`, "label": `Include patterns`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };

  public addMoreExPattersProperties: ClButtonProperties = {
    "id": `button17`, "label": `Add include patterns`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreExtractPatterns.bind(this)
  };

  public includePrefixesProperties: ClLabelProperties = {
    "id": `includePrefixes`, "label": `Include prefixes`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };


  public addMoreInlcudePrefixesProperties: ClButtonProperties = {
    "id": `addMoreInlcudePrefixes`, "label": `Add include prefixes`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreExtractPrefixes.bind(this)
  };


  public saveProperties: ClButtonProperties = {
    "id": `save`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true,
  };
}
