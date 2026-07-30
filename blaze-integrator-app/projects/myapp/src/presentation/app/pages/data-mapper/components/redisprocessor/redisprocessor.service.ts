import { Router } from "@angular/router";
import { inject, Injectable, signal } from "@angular/core";
import { ClButtonBehavior, ClButtonProperties, ClInputProperties, ClInputType, ClSelectProperties, IClButtonType } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable()
export class RedisProcessorService {
  constructor(public router: Router) {
  }

  public form_0FormValue = signal<any>({});
  public urlProperties: ClInputProperties = {
    "id": `url`, "label": `Url`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter url`,
  };
  public operationProperties: ClSelectProperties = {
    "id": `operation`, "label": `Operation`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "Get", "value": "GET" }, { "text": "Set", "value": "SET" }], "placeholder": `Select`,
    
  };
  public keyProperties: ClInputProperties = {
    "id": `key`, "label": `Key`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter key`,
  };
  public valueProperties: ClInputProperties = {
    "id": `value`, "label": `Value`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter value`,
  };
  public ttlProperties: ClInputProperties = {
    "id": `ttl`, "label": `TTL`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.number, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Duration in seconds`,
  };


  public saveButtonProperties: ClButtonProperties = {
    "id": `saveButton`, "label": `Save`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `mat-primary`,
    }, "disabled": true,
  };
}
