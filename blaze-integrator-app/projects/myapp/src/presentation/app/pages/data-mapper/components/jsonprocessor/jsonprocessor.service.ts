import { EventEmitter, inject, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class JsonProcessorService {

  public mappingArrayChange: EventEmitter<any> = new EventEmitter();
  public node: any;
  mappingArray: any[] = [{key: '', field:''}];

  public form_2FormValue = signal<any>({});

  public label9Properties: ClLabelProperties = {
    "id": `label9`, "label": `Mapping`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-neutral-700 font-semibold text-lg text-primary-800 mb-4`,
    },
  };

  private button9Disabled = signal<boolean>(false);
  public button9Properties: ClButtonProperties = {
    "id": `button9`, "label": `Add more`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.button9Disabled, onSubmit: this.addMoreMapping.bind(this)
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };

  addMoreMapping(){
    if(this.node.label === 'fixed_position_parser' ) {
      this.mappingArray.push({key: '', field:''});
    } else {
      this.mappingArray.push({key: '', field:''});
    }
    this.mappingArrayChange.emit(this.mappingArray);
  }

}
