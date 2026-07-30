import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class MultipartDataformProcessorService {
  fields: any[]= [{name: '', contentType: '', data: ''}];

  public dynamicFieldsChange: EventEmitter<any> = new EventEmitter();

  addMoreFields(){
    this.fields.push({name: '', contentType: '', data: ''});
    this.dynamicFieldsChange.emit();
  }

  public form_15FormValue = signal<any>({});

  public fieldsProperties: ClLabelProperties = {
    "id": `fields`, "label": `Fields`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-neutral-700 font-semibold text-lg text-primary-800 mb-4`,
    },
  };
  private addMoreFieldsButtonDisabled = signal<boolean>(false);
  public addMoreFieldsButtonProperties: ClButtonProperties = {
    "id": `addMoreFieldsButton`, "label": `Add more fields`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.addMoreFieldsButtonDisabled,
    onSubmit: this.addMoreFields.bind(this)
  };


  public button18Properties: ClButtonProperties = {
    "id": `button18`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
