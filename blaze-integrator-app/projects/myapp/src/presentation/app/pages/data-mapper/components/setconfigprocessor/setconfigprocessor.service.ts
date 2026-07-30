import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class SetConfigProcessorService {

  configs: any[]= [{key: '', value: ''}];
  public dynamicFieldsChange: EventEmitter<any> = new EventEmitter();

  addMoreConfigs(){
    this.configs.push({key: '', value: ''});
    this.dynamicFieldsChange.emit();
  }

  public form_4FormValue = signal<any>({});
  public configsLabelProperties: ClLabelProperties = {
    "id": `configsLabel`, "label": `Configs`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-neutral-700 font-semibold text-lg text-primary-800 mb-4`,
    },
  };
  private addMoreDisabled = signal<boolean>(false);
  public addMoreProperties: ClButtonProperties = {
    "id": `addMore`, "label": `Add more configs`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    "disabled": this.addMoreDisabled,
    onSubmit: this.addMoreConfigs.bind(this)
  };


  public saveButtonProperties: ClButtonProperties = {
    "id": `button9`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
