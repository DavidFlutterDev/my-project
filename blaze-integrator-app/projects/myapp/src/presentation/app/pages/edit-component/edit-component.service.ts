import { inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClCardProperties } from "@clay/ui-components/containers";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClInputProperties, ClInputType, ClSelectProperties, ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";

export class EditcomponentService {
  private http: HttpClient = inject(HttpClient);


  public onProceed() {}

  public card0Properties: ClCardProperties = {
    "id": "card0", "type": ClComponentTypes.card, "style": {
      "cssClasses": "", "contentWidth": "w-full", "justifyContent": "", "alignContent": "", "labelCssClasses": "text-2xl md:text-3xl font-medium  ",
    },
  };
  public pipelineNameProperties: ClInputProperties = {
    "id": "pipelineName", "label": "Pipeline name", "floatLabel": "auto", "appearance": "fill", "subscriptSizing": "fixed", "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": "flex-auto w-full", "contentWidth": "w-full", "justifyContent": "", "alignContent": "",
    }, "optional": false, "minLength": 1, "maxLength": 100,
  };
  public templateProperties: ClSelectProperties = {
    "id": "template", "label": "Pipeline template", "appearance": "fill", "subscriptSizing": "fixed", "type": ClComponentTypes.select, "style": {
      "cssClasses": "flex-auto w-full", "contentWidth": "w-full", "justifyContent": "", "alignContent": "",
    }, "options": [{ "text": "Kafka1", "value": "kafka1", "selected": true }, { "text": "kafka 2", "value": "kafka2" }], "optional": false,
  };
  public pipelineCardProperties: ClCardProperties = {
    "id": "pipelineCard", "type": ClComponentTypes.card, "style": {
      "cssClasses": "h-40 bg-neutral-200", "contentWidth": "w-full", "justifyContent": "", "alignContent": "", "labelCssClasses": "text-2xl md:text-3xl font-medium  ",
    },
  };
  private proceedButtonDisabled = signal<boolean>(false);
  public proceedButtonProperties: ClButtonProperties = {
    "id": "proceedButton", "label": "Proceed", "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.submit, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": "mat-primary", "contentWidth": "", "justifyContent": "", "alignContent": "",
    }, "onSubmit": this.onProceed.bind(this), "disabled": this.proceedButtonDisabled,
  };
}
