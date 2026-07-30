import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior, ClInputProperties, ClInputType, ClRadioProperties, ClDisplay } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class KafkaInputService {
  public addressList: string[] = [''];
  public topicList: string[] = [''];
  public dynamicFieldChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public addMoreAddress() {
    this.addressList.push('');
    this.dynamicFieldChange.emit();
  }

  public addMoreTopics() {
    this.topicList.push('');
    this.dynamicFieldChange.emit();
  }

  public form_25FormValue = signal<any>({});
  public addressesabelProperties: ClLabelProperties = {
    "id": `addressesabel`, "label": `Addresses`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-800 font-bold`,
    },
  };
  private addMoreAddressButtonDisabled = signal<boolean>(false);
  public addMoreAddressButtonProperties: ClButtonProperties = {
    "id": `addMoreAddressButton`, "label": `Add more address`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.addMoreAddressButtonDisabled,
    onSubmit: this.addMoreAddress.bind(this)
  };
  public topicsLabelProperties: ClLabelProperties = {
    "id": `topicsLabel`, "label": `Topics`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-800 font-bold`,
    },
  };
  private addMoreTopicsButtonDisabled = signal<boolean>(false);
  public addMoreTopicsButtonProperties: ClButtonProperties = {
    "id": `addMoreTopicsButton`, "label": `Add more topic`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.addMoreTopicsButtonDisabled,
    onSubmit: this.addMoreTopics.bind(this)
  };
  public targetVersionProperties: ClInputProperties = {
    "id": `targetVersion`, "label": `Target version`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter target version`,
  };
  public consumerGroupProperties: ClInputProperties = {
    "id": `consumerGroup`, "label": `consumer group`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter consumer group`,
  };
  public clientIDProperties: ClInputProperties = {
    "id": `clientID`, "label": `Client ID`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter client ID`,
  };

  public startFromOldestProperties: ClRadioProperties = {
    "id": `startFromOldest`, "label": `Start from oldest`, "type": ClComponentTypes.radio, "style": {
      "labelCssClasses": `text-md`,
    }, "options": [{ "text": "Enable", "value":  true, "checked": true }, { "text": "Disable", "value": false, "checked": false }], "display": ClDisplay.row, "radioStyle": `cl-radio-button`,
  };
  public commitPeriodProperties: ClInputProperties = {
    "id": `commitPeriod`, "label": `Commit period`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter commit period`, "suffixLabel": `secs`,
  };

  public maxiimumProcessingPeriodProperties: ClInputProperties = {
    "id": `maxiimumProcessingPeriod`, "label": `Maximum processing period`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter maximum processing period`, "suffixLabel": `secs`,
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
