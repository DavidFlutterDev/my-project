import { Router } from "@angular/router";
import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClSelectProperties, ClInputProperties, ClInputType, ClLabelProperties, ClButtonProperties,
  IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class LogProcessorService {
  public mappingArrayChange: EventEmitter<any> = new EventEmitter();

  mappingArray: any[] = [];

  constructor(public router: Router) {
  }

  addMoreMapping(){
    this.mappingArray.push({key: '', field:''});
    this.mappingArrayChange.emit(this.mappingArray);
  }

  public form_54FormValue = signal<any>({});
  public levelProperties: ClSelectProperties = {
    "id": `level`, "label": `Level`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "Info", "value": "INFO" }, { "text": "debug", "value": "DEBUG" }, { "text": "Trace", "value": "TRACE", "hidden": false }, { "text": "Error", "value": "ERROR", "hidden": false }],
  };
  public messageInputIdProperties: ClInputProperties = {
    "id": `messageInputId`, "label": `Message`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter message`,
  };
  public MappingLabelProperties: ClLabelProperties = {
    "id": `MappingLabel`, "label": `Mapping`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-900 font-bold`,
    },
  };
  private addMoreMappingButtonDisabled = signal<boolean>(false);
  public addMoreMappingButtonProperties: ClButtonProperties = {
    "id": `addMoreMappingButton`, "label": `Add more mapping`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.addMoreMappingButtonDisabled,
    onSubmit: this.addMoreMapping.bind(this)
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
