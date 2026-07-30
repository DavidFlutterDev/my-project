import { Router } from "@angular/router";
import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClInputProperties, ClInputType, ClCheckboxProperties,
  ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { DataMapperService } from "../../data-mapper.service";

@Injectable()
export class SwitchProcessorService {
  conditions: {id: string, label: string}[];

  public dynamicFieldsChange: EventEmitter<any> = new EventEmitter();

  constructor(private dataMapperService: DataMapperService) {
    this.conditions = [{id: this.dataMapperService.generateUniqueId(), label:""}];
  }

  addMoreChecks(){
    this.conditions.push({id: this.dataMapperService.generateUniqueId(), label:""});
    this.dynamicFieldsChange.emit();
  }

  public form_0FormValue = signal<any>({});
  public label7Properties: ClLabelProperties = {
    "id": `label7`, "label": `Checks`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-900`,
    },
  };
  public caseInputProperties: ClInputProperties = {
    "id": `caseInput`, "label": `Check`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    },
  };
  public fallthroughcheckboxProperties: ClCheckboxProperties = {
    "id": `fallthroughcheckbox`, "label": `Fallthrough`, "type": ClComponentTypes.checkbox, "style": {
      "labelCssClasses": `text-md`,
    }, "checked": true,
  };

  private addMoreCheckDisabled = signal<boolean>(false);
  public addMoreCheckProperties: ClButtonProperties = {
    "id": `addMoreCheck`, "label": `Add more check`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `feather:plus-circle`,
    "disabled": this.addMoreCheckDisabled,
    onSubmit: this.addMoreChecks.bind(this)
  };

  public button7Properties: ClButtonProperties = {
    "id": `save`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true,
  };
}
