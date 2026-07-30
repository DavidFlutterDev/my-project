import { Router } from "@angular/router";
import { EventEmitter, inject, Injectable, signal } from "@angular/core";
import { ClIconProperties, ClLabelProperties, ClInputProperties, ClInputType, ClButtonProperties, IClButtonType, ClButtonBehavior, ClSelectProperties } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { ClAccordionProperties, ClCardProperties } from "@clay/ui-components/containers";
import { Condition, SqlProcessorFormModel } from "./sqlprocessor.model";

@Injectable()
export class SqlProcessorService {

  public colMappingArrayChange: EventEmitter<any> = new EventEmitter();

  operators: string[] = ['<', '>', '=', '!=']
  columnsArray: string[] = [];
  argsMappingArray: string[] = [];
  colFieldMappingArray: any[] = [{column:'', field: ''}]
  whereConditionArray: Condition[] = [];

  constructor(public router: Router) {
  }

  addMoreColumnClick(){
    this.columnsArray.push('');
  }

  addMoreArgsMapping(){
    this.argsMappingArray.push('');
  }

  addMoreColumnMapping(){
    this.colFieldMappingArray.push({column:'', field: ''});
    this.colMappingArrayChange.emit(this.colFieldMappingArray);
  }

  addMoreWhereConditions(){
    this.whereConditionArray.push({col:'', operator: '', value: ''});
  }

  public form_1FormValue = signal<SqlProcessorFormModel>({});

  public driverProperties: ClSelectProperties = {
    "id": `scannerType`, "label": `Driver`, "appearance": `fill`, "subscriptSizing": `fixed`, "type": ClComponentTypes.select, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "options": [{ "text": "mysql", "value": "mysql" }],
  };
  public addressProperties: ClInputProperties = {
    "id": `address`, "label": `Address`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter address`,
  };
  public userNameProperties: ClInputProperties = {
    "id": `username`, "label": `Username`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter username`,
  };
  public passwordProperties: ClInputProperties = {
    "id": `password`, "label": `Password`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.password, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter password`,
  };
  public hostProperties: ClInputProperties = {
    "id": `host`, "label": `Host`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter host`,
  };
  public schemaProperties: ClInputProperties = {
    "id": `schema`, "label": `Schema`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter schema`,
  };

  public tableProperties: ClInputProperties = {
    "id": `table`, "label": `Table`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter table`,
  };

  public queryInputProperties: ClInputProperties = {
    "id": `query`, "label": `Query`, "floatLabel": `auto`, "appearance": `fill`, "subscriptSizing": `fixed`, "inputType": ClInputType.text, "type": ClComponentTypes.input, "style": {
      "cssClasses": `flex-auto w-full`, "contentWidth": `w-full`,
    }, "placeholder": `Enter query`,
  };

  public columnsLabelIdProperties: ClLabelProperties = {
    "id": `columnsLabelId`, "label": `Columns `, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };
  public columnsFieldsMapLabelProperties: ClLabelProperties = {
    "id": `columnsLabelId`, "label": `Columns field mapping`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };
  private addMoreColMappingDisabled = signal<boolean>(false);
  public addMoreColMappingProperties: ClButtonProperties = {
    "id": `addMoreColumnMapping`, "label": `Add more column mapping`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.addMoreColMappingDisabled,
    onSubmit: this.addMoreColumnMapping.bind(this)
  };

  private addMoreColumnDisabled = signal<boolean>(false);
  public addMoreColumnProperties: ClButtonProperties = {
    "id": `addMoreColumn`, "label": `Add column`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.addMoreColumnDisabled,
    onSubmit: this.addMoreColumnClick.bind(this)
  };
  public accordion0Properties: ClAccordionProperties = {
    "id": `accordion0`, "hideToggle": true, "openMultiple": false, "type": ClComponentTypes.accordion, "style": {
      "contentWidth": `w-full`, "iconCssClasses": `icon-size-5`,
      "cssClasses": `w-full flex-auto dense-mat-accordion`,
      "titleCssClasses": `text-xl font-normal text-primary-800`,
    }, "collapsedIcon": `fss_icons:chevron-circle-down`,
    "expandedIcon": `fss_icons:chevron-circle-up-filled`,
  };
  public accordion0WhereHeaderProperties = {
    "label": `Where`, "panelOpenState": true, "actionIcons": [

    ], "actionButtons": [

    ],
  };
  public card5Properties: ClCardProperties = {
    "id": `card5`, "type": ClComponentTypes.card, "style": {
      "cssClasses": 'bg-primary-50',
      "contentWidth": `w-full`, "labelCssClasses": `text-2xl md:text-3xl font-medium`,
    },
  };
  public columLabelIdProperties: ClLabelProperties = {
    "id": `columLabelId`, "label": `Column`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };
  public operatorLabeIdProperties: ClLabelProperties = {
    "id": `operatorLabeId`, "label": `Operator`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };
  public fieldvalueLabelIdProperties: ClLabelProperties = {
    "id": `field/valueLabelId`, "label": `Field/value`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };
  public icon3Properties: ClIconProperties = {
    "id": `icon3`, "type": ClComponentTypes.icon, "style": {
      "cssClasses": `icon-size-4`,
    },
  };
  private addMoreConditionButtonDisabled = signal<boolean>(false);
  public addMoreConditionButtonProperties: ClButtonProperties = {
    "id": `addMoreConditionButton`, "label": `Add condition`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`, "disabled": this.addMoreConditionButtonDisabled,
    onSubmit: this.addMoreWhereConditions.bind(this)
  };
  public argsMappingLabelProperties: ClLabelProperties = {
    "id": `argsMappingLabel`, "label": `Args Mapping`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base font-bold text-neutral-800`,
    },
  };

  public addMoreArgsMappingProperties: ClButtonProperties = {
    "id": `addMoreOrigins`, "label": `Add argument mapping`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500 bg-primary-50`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreArgsMapping.bind(this)
  };

  // private saveButtonIdDisabled = signal<boolean>(false);
  public saveButtonIdProperties: ClButtonProperties = {
    "id": `saveButtonId`,
    "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": { "cssClasses": `mat-primary mr-4`},
    "disabled": true,
  };
}
