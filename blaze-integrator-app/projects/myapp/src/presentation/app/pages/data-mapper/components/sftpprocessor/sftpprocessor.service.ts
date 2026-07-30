
import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClInputProperties, ClInputType, ClSelectProperties, ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior, ClRadioProperties, ClDisplay } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties } from "@clay/ui-components/containers";

@Injectable()
export class SftpProcessorService {
  public pathList: string[] = [''];
  public pathListChange: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  public addMorePath() {
    this.pathList.push('');
    this.pathListChange.emit();
  }

  public form_31FormValue = signal<any>({});
  public addressProperties: ClInputProperties = {
    "id": `address`, "label": `Address`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter address`,
  };
  public userNameProperties: ClInputProperties = {
    "id": `username`, "label": `User name`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter user name`,
  };
  public passwordProperties: ClInputProperties = {
    "id": `password`, "label": `Password`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter password`,
  };
  public pathIdProperties: ClInputProperties = {
    "id": `pathId`, "label": `Path`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter path`,
  };
  public codecProperties: ClSelectProperties = {
    "id": `codec`, "label": `Codec`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "all-bytes", "value": "all-bytes" }, { "text": "Append", "value": "append" }, { "text": "delim:x", "value": "dellim:x", "hidden": false }, { "text": "lines", "value": "lines", "hidden": false }],
  };
  public credentialsIdProperties: ClAccordionProperties = {
    "id": `credentialsId`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };

  public credentialsIdCredentialsHeaderProperties = {
    "label": `Credentials`, "panelOpenState": true, "actionIcons": [
    ], "actionButtons": [],
  };

  public pathsProperties: ClLabelProperties = {
    "id": `paths`, "label": `Paths`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };

  private addMorePathsDisabled = signal<boolean>(false);
  public addMorePathsProperties: ClButtonProperties = {
    "id": `addMorePaths`, "label": `Add more paths`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `bg-primary-50 text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMorePath.bind(this)
  };
  public deleteOnfinishProperties: ClRadioProperties = {
    "id": `deleteOnfinish`, "label": `Delete on finish`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public accordion1Properties: ClAccordionProperties = {
    "id": `accordion1`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public accordion1WatcherHeaderProperties = {
    "label": `Watcher`, "panelOpenState": false, "actionIcons": [

    ], "actionButtons": [

    ],
  };

  public watcherProperties: ClRadioProperties = {
    "id": `watcher`, "label": `Watcher`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public minimumAgeProperties: ClInputProperties = {
    "id": `minimumAge`, "label": `Minimum age`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter minimum age`, "suffixLabel": `secs`,
  };
  public pollIntervalProperties: ClInputProperties = {
    "id": `pollInterval`, "label": `Poll interval`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter poll interval`, "suffixLabel": `secs`,
  };
  public accordion1ScannerHeaderProperties = {
    "label": `Scanner`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };

  public scannerTypeProperties: ClSelectProperties = {
    "id": `scannerType`, "label": `Scanner type`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "xml", "value": "xml" }, { "text": "csv", "value": "csv" }, { "text": "fixed position file", "value": "fixed-position-file", "hidden": false }, { "text": "Json", "value": "json", "hidden": false }, { "text": "txt", "value": "txt", "hidden": false }],
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `save`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true,
  };
}
