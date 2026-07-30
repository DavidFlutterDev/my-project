import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClSelectProperties, ClInputProperties, ClInputType, ClLabelProperties,
  ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class EncryptProcessorsService {

  mappingList: string[] = ['']
  public mappingListChange: EventEmitter<any> = new EventEmitter();

  addMoreMapping() {
    this.mappingList.push('');
    this.mappingListChange.emit('');
  }

  public form_10FormValue = signal<any>({});
  public aesmodedropdownProperties: ClSelectProperties = {
    "id": `aes_mode`, "label": `AES mode`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select,
    "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "ECB", "value": "ECB" }, { "text": "CBC", "value": "CBC" }],
    "placeholder": `Select mode`,
  };

  public keyFieldProperties: ClInputProperties = {
    "id": `aes_key`, "label": `AES key`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`,
    "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    },  "placeholder": `Enter key`,
  };

  public passwordInputProperties: ClInputProperties = {
    "id": `password`, "label": `Password`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`,
    "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    },  "placeholder": `Enter password`,
  };

  public mappingLabelProperties: ClLabelProperties = {
    "id": `mappingLabel`, "label": `Mapping`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-lg text-neutral-900 font-bold mb-3`,
    },
  };

  private button24Disabled = signal<boolean>(false);
  public button24Properties: ClButtonProperties = {
    "id": `button24`, "label": `Add more mapping`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.button24Disabled, onSubmit: this.addMoreMapping.bind(this),
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };

}
