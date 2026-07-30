import { Injectable, signal } from "@angular/core";
import { ClSelectProperties, ClButtonProperties,
  IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class DataValidatorProcessorService {

  public form_55FormValue = signal<any>({});
  public schemaSelectProperties: ClSelectProperties = {
    "id": `schema`, "label": `Schema`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [],
  };

  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
