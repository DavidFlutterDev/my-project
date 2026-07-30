import { Injectable, signal } from "@angular/core";
import {
  ClInputProperties, ClInputType, ClRadioProperties, ClDisplay, ClLabelProperties,
  ClButtonProperties, IClButtonType, ClButtonBehavior, ClIconProperties,
  ClMultiSelectProperties
} from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties, ClCardProperties } from "@clay/ui-components/containers";

@Injectable()
export class HttpServerprocessorService {

  headers: any[] = [];
  allowedOrigins: string[] = [];
  metadata_headers: any = {
    include_prefixes: [],
    include_patterns: []
  }

  addMoreHeaders() {
    this.headers.push({ key: '', value: '' });
  }

  addMoreAllowedOrigins() {
    this.allowedOrigins.push('');
  }

  addMoreMetadataPatterns() {
    this.metadata_headers.include_patterns.push('');
  }
  addMoreMetadataPrefixes() {
    this.metadata_headers.include_prefixes.push('');
  }

  public form_33FormValue = signal<any>({});
  public addressProperties: ClInputProperties = {
    "id": `address`, "label": `Address`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter address`,
  };
  public pathProperties: ClInputProperties = {
    "id": `path`, "label": `Path`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter path`,
  };
  public allowedVerbsProperties: ClMultiSelectProperties = {
    "id": `allowedVerbs`,
    "label": `Allowed verbs`,
    "appearance": `fill`,
    "subscriptSizing": `fixed`,
    "type": ClComponentTypes.multiselect,
    "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    },
    "options": [
      { "text": "Get", "value": "GET" },
      { "text": "Post", "value": "POST" },
      { "text": "Put", "value": "PUT" },
      { "text": "Delete", "value": "DELETE"}
    ],
    "itemLimit": 3,
    "placeholder": `Select allowed verbs`,
  };

  public timeoutProperties: ClInputProperties = {
    "id": `timeout`, "label": `timeout`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`,
    "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter timeout`, "suffixLabel": `secs`,
  };

  public CorsProperties: ClAccordionProperties = {
    "id": `Cors`, "hideToggle": true, "openMultiple": true, "type": ClComponentTypes.accordion,
    "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`,
      "titleCssClasses": `text-xl font-normal text-primary-800`,
    },
    "collapsedIcon": `fss_icons:chevron-circle-down`,
    "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };

  public CorsCorsHeaderProperties = {
    "label": `Cors`, "panelOpenState": true, "actionIcons": [], "actionButtons": [],
  };

  public corsFlagProperties: ClRadioProperties = {
    "id": `corsFlag`, "label": `Cors`, "type": ClComponentTypes.radio, "style": {
      "cssClasses": `mb-4`, "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value": true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public allowedoriginsProperties: ClLabelProperties = {
    "id": `allowedorigins`, "label": `Allowed origins`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };

  public addMoreOriginsProperties: ClButtonProperties = {
    "id": `addMoreOrigins`, "label": `Add allowed origins`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreAllowedOrigins.bind(this)
  };

  public syncResponseAccordionProperties: ClAccordionProperties = {
    "id": `syncResponseAccordion`, "hideToggle": true,
    "openMultiple": true, "type": ClComponentTypes.accordion,
    "style": {
      "contentWidth": `w-full`,
      "iconCssClasses": `icon-size-5`,
      "cssClasses": `w-full flex-auto`,
      "titleCssClasses": `text-xl font-normal text-primary-800`,
    },
    "collapsedIcon": `fss_icons:chevron-circle-down`,
    "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };

  public syncResponseAccordionSyncresponseHeaderProperties = {
    "label": `Sync response`, "panelOpenState": true, "actionIcons": [], "actionButtons": [],
  };

  public statusProperties: ClInputProperties = {
    "id": `status`, "label": `Status`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    },
  };

  public accordion11Properties: ClAccordionProperties = {
    "id": `accordion11`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };

  public accordion11HeadersHeaderProperties = {
    "label": `Headers`, "panelOpenState": false, "actionIcons": [], "actionButtons": [],
  };

  public card3Properties: ClCardProperties = {
    "id": `card3`, "type": ClComponentTypes.card, "style": {
      "contentWidth": `w-full`, "labelCssClasses": `text-2xl md:text-3xl font-medium  `,
    },
  };

  public label10Properties: ClLabelProperties = {
    "id": `label10`, "label": `Key`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-800 font-bold`,
    },
  };

  public label11Properties: ClLabelProperties = {
    "id": `label11`, "label": `Value`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-800 font-bold`,
    },
  };

  public icon6Properties: ClIconProperties = {
    "id": `icon6`, "type": ClComponentTypes.icon, "style": {
      "cssClasses": `icon-size-4`,
    },
  };

  public addMoreHeadersProperties: ClButtonProperties = {
    "id": `addMoreHeaders`, "label": `Add headers`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreHeaders.bind(this)
  };

  public accordion11MetadataheadersHeaderProperties = {
    "label": `Metadata headers`, "panelOpenState": false, "actionIcons": [], "actionButtons": [],
  };

  public includePrefixesProperties: ClLabelProperties = {
    "id": `includePrefixes`, "label": `Include prefixes`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };


  public addMorePatternProperties: ClButtonProperties = {
    "id": `addMorePrefixes`, "label": `Add include prefixes`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `bg-primary-50 text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreMetadataPatterns.bind(this)
  };

  public includePatternLabelProperties: ClLabelProperties = {
    "id": `label29`, "label": `Include patterns`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };


  public addMorePrefixesProperties: ClButtonProperties = {
    "id": `button29`, "label": `Add include patterns`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `bg-primary-50 text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreMetadataPrefixes.bind(this)
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
