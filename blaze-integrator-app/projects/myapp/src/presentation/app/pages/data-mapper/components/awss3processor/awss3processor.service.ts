import { Router } from "@angular/router";
import {Injectable, signal } from "@angular/core";
import { ClInputProperties, ClInputType, ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior, ClRadioProperties, ClDisplay, ClSelectProperties } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties } from "@clay/ui-components/containers";

@Injectable()
export class AwsS3ProcessorService {

  exclude_prefixes: string[]= [];

  constructor(public router: Router) {
  }

  addMoreExcludePrefixes() {
    this.exclude_prefixes.push('');
  }

  public form_1FormValue = signal<any>({});
  public bucketProperties: ClInputProperties = {
    "id": `bucket`, "label": `Bucket`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter bucket`,
  };
  public prefixProperties: ClInputProperties = {
    "id": `prefix`, "label": `Prefix`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter prefix`,
  };
  public pathProperties: ClInputProperties = {
    "id": `path`, "label": `Path`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter path`,
  };
  public timeoutProperties: ClInputProperties = {
    "id": `timeout`, "label": `Timeout`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter timeout`, "suffixLabel": `secs`,
  };
  public regionProperties: ClInputProperties = {
    "id": `region`, "label": `Region`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter region`,
  };
  public endpointProperties: ClInputProperties = {
    "id": `endpoint`, "label": `Endpoint`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter endpoint`,
  };
  public metadataProperties: ClLabelProperties = {
    "id": `metadata`, "label": `Metadata`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-lg font-bold text-neutral-800`,
    },
  };

  private addMoreExcludePrefixesDisabled = signal<boolean>(false);
  public addMoreExcludePrefixesProperties: ClButtonProperties = {
    "id": `addMoreExcludePrefixes`, "label": `Add exclude prefixes`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.addMoreExcludePrefixesDisabled,
    onSubmit: this.addMoreExcludePrefixes.bind(this)
  };
  public credentialsProperties: ClAccordionProperties = {
    "id": `credentials`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public credentialsCredentialsHeaderProperties = {
    "label": `Credentials`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };

  public profileProperties: ClInputProperties = {
    "id": `profile`, "label": `Profile`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter profile`,
  };
  public iDProperties: ClInputProperties = {
    "id": `iD`, "label": `ID`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter ID`,
  };
  public secretProperties: ClInputProperties = {
    "id": `secret`, "label": `Secret`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter secret`,
  };
  public tokenProperties: ClInputProperties = {
    "id": `token`, "label": `Token`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter token`,
  };
  public fromEc2RoleProperties: ClRadioProperties = {
    "id": `fromEc2Role`, "label": `From ec2 role`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public roleProperties: ClInputProperties = {
    "id": `role`, "label": `Role`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter role`,
  };
  public roleExternalIdProperties: ClInputProperties = {
    "id": `roleExternalId`, "label": `Role external ID`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter role external ID`,
  };
  public deleteObjectsProperties: ClRadioProperties = {
    "id": `deleteObjects`, "label": `Delete objects`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public scannerProperties: ClAccordionProperties = {
    "id": `scanner`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public scannerScannerHeaderProperties = {
    "label": `Scanner`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };

  public scannerTypeProperties: ClSelectProperties = {
    "id": `scannerType`, "label": `Scanner type`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "xml", "value": "XML" }, { "text": "csv", "value": "CSV" }, { "text": "Fixed position file", "value": "FIXED_POSITION_FILE", "hidden": false }, { "text": "Json", "value": "JSON", "hidden": false }, { "text": "txt", "value": "TXT", "hidden": false }],
  };

  public saveProperties: ClButtonProperties = {
    "id": `save`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true
  };
}
