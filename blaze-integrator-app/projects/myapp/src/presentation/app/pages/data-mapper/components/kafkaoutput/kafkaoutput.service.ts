import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior, ClInputProperties, ClInputType } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties } from "@clay/ui-components/containers";

@Injectable()
export class KafkaOutputService {
  public addressList: string[] = [''];
  public dynamicFieldChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public addMoreAddress() {
    this.addressList.push('');
    this.dynamicFieldChange.emit();
  }

  public form_16FormValue = signal<any>({});
  public addressLabelProperties: ClLabelProperties = {
    "id": `addressLabel`, "label": `Addresses`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-800 font-bold`,
    },
  };
  private addMoreAddressesButtonDisabled = signal<boolean>(false);
  public addMoreAddressesButtonProperties: ClButtonProperties = {
    "id": `addMoreAddressesButton`, "label": `Add more address`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.addMoreAddressesButtonDisabled,
    onSubmit: this.addMoreAddress.bind(this)
  };
  public topicProperties: ClInputProperties = {
    "id": `topic`, "label": `Topic`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter topic`,
  };
  public clientIdProperties: ClInputProperties = {
    "id": `clientId`, "label": `Client ID`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter client ID`,
  };
  public accordion0Properties: ClAccordionProperties = {
    "id": `accordion0`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`, "cssClasses": `w-full flex-auto`, "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`, "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public accordion0BatchingHeaderProperties = {
    "label": `Batching`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };
  public countProperties: ClInputProperties = {
    "id": `count`, "label": `Count`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter count`,
  };
  public byteSizeProperties: ClInputProperties = {
    "id": `byteSize`, "label": `Byte size`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter byte size`,
  };
  public periodProperties: ClInputProperties = {
    "id": `period`, "label": `Period`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter period`, "suffixLabel": `secs`,
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `button4`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true,
  };
}
