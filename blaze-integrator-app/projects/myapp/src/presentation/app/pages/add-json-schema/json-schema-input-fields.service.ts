import { style } from '@angular/animations';
import {
  ClButtonProperties,
  ClInputComponent,
  ClInputProperties,
  ClInputType,
  ClRadioProperties,
  ClTextareaProperties,
} from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { cloneDeep } from 'lodash';
import { JsonFieldTypes } from './json-schema-enums';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import { inject } from '@angular/core';
import { DateTime } from 'luxon';

export class JsonSchemaInputFieldsService {
  constructor() {}

  public level: number = 0;
  readonly propertyFactory: ClComponentPropertyFactory = inject(
    ClComponentPropertyFactory,
  );

  addChild: boolean = true;
  getParentCard(
    childName: any,
    onDelete: (level: any) => void,
    onFieldNameValueChange?: (parentId: any, val: any) => void,
    onFieldTypeValueChange?: (parentId: any, val: any) => void,
    onRequiredValueChange?: (parentId: any, val: any) => void,
  ) {
    let level = Date.now();

    let json = {
      id: level,

      properties: {
        id: level,
        selector: 'cl-accordion',
        name: 'Accordion',
        layout: 'accordion',
        type: 'displayContainer',
        properties: {
          id: level,
          hideToggle: true,
          openMultiple: true,
          type: 'accordion',
          style: {
            alignContent: '',
            justifyContent: '',
            contentWidth: 'w-full',
            iconCssClasses: 'icon-size-5',
            cssClasses: 'w-full flex-auto',
            titleCssClasses: 'text-xl font-normal text-primary-800',
          },
          collapsedIcon: 'fss_icons:chevron-circle-down',
          expandedIcon: 'fss_icons:chevron-circle-up-filled',
          expansionPanelProperties: [
            {
              expansionPanelHeaderProperties: {
                label: childName,
                panelOpenState: true,
                actionIcons: [this.getDeleteButton(level, onDelete)],
              },
              expansionPanelContentProperties: [
                {
                  id: level,
                  selector: 'div',
                  name: 'Grid',
                  layout: 'grid',
                  type: 'container',
                  properties: {
                    cssClass:
                      'grid w-full gap-x-4 gap-y-0 grid-cols-3 border-t-0',
                  },
                  defaultProperties: {
                    cssClass:
                      'flex w-full border border-dashed rounded-md border-blue-400',
                  },
                  children: [
                    this.getFieldName(
                      level,
                      onFieldNameValueChange?.bind(this),
                    ),
                    this.getFieldType(
                      level,
                      onFieldTypeValueChange?.bind(this),
                    ),
                    this.getIsRequired(
                      level,
                      onRequiredValueChange?.bind(this),
                    ),
                  ],
                },
              ],
            },
          ],
        },
      },
      //passing an empty function as parameter
      childAddButtonProperties: this.getAddNestedFieldButtonProperties(() => {
        // this.onClickAddChildren(parentNode,false);
      }),
    };
    return cloneDeep(json);
  }

  getDeleteButton(level: any, onDelete: (level: any) => void) {
    let json = {
      id: 'deleteIcon',
      type: ClComponentTypes.icon,
      iconName: 'heroicons_outline:trash',
      style: { cssClasses: 'text-red-600 cursor-pointer' },
      onIconClicked: () => {
        onDelete(level);
      },
    };
    return cloneDeep(json);
  }
  getFieldName(
    parentId: any,
    onFieldNameValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: `fieldName`,
      name: 'fieldName',
      selector: 'cl-input',
      layout: ClComponentTypes.input,
      type: 'formField',
      properties: {
        id: `fieldName`,
        name: 'fieldName',
        label: `Field name`,
        floatLabel: `auto`,
        appearance: `fill`,
        inputType: ClInputType.text,
        type: ClComponentTypes.input,
        style: {
          cssClasses: `flex-auto w-full mb-4`,
          contentWidth: `w-full`,
          justifyContent: ``,
          alignContent: ``,
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onFieldNameValueChange != null) {
            onFieldNameValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getFieldType(
    parentId: any,
    onFieldTypeValueChange?: (parentId: any, val: any) => void,
  ) {
    console.log(123, 'getFieldType: parentId: ', parentId);
    let json: any = {
      id: `fieldType`,
      selector: 'cl-select',
      name: 'fieldType',
      layout: ClComponentTypes.select,
      type: 'FieldType',
      properties: {
        id: `fieldType`,
        name: 'fieldType',
        label: `Field type`,
        appearance: `fill`,
        subscriptSizing: `fixed`,
        type: ClComponentTypes.select,
        style: {
          cssClasses: `flex-auto w-full mb-4`,
          contentWidth: `w-full`,
          justifyContent: ``,
          alignContent: ``,
        },
        onValueChange: (val: any) => {
          if (onFieldTypeValueChange != null) {
            onFieldTypeValueChange(parentId, val);
          }
        },
        options: [
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.string),
            value: JsonFieldTypes.string,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.number),
            value: JsonFieldTypes.number,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.boolean),
            value: JsonFieldTypes.boolean,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.object),
            value: JsonFieldTypes.object,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.array),
            value: JsonFieldTypes.array,
          },
        ],
        optional: false,
      },
    };

    return json;
  }

  getIsRequired(
    parentId: any,
    onRequiredValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'required',
      selector: 'cl-radio',
      name: 'required',
      layout: 'radio',
      type: 'formField',
      properties: {
        id: 'required',
        name: 'required',
        label: 'Is it required?',
        type: 'radio',
        style: {
          cssClasses: '',
          labelCssClasses: 'text-md',
          contentWidth: '',
          justifyContent: '',
          alignContent: '',
        },
        options: [
          {
            text: 'Yes',
            value: 'Yes',
            checked: true,
          },
          {
            text: 'No',
            value: 'No',
            checked: false,
          },
        ],
        display: 'flex-row',
        radioStyle: 'cl-radio-button',
        onValueChanged: (value: any) => {
          console.log(value);
          if (onRequiredValueChange != null) {
            onRequiredValueChange(parentId, value);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getPattern(
    parentId: any,
    onPatternValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'pattern',
      selector: 'cl-textarea',
      name: 'pattern',
      type: 'formField',
      layout: 'textarea',
      import: '@clay/ui-components/basic',
      properties: {
        id: 'pattern',
        rows: 1,
        name: 'pattern',
        label: 'Pattern',
        showCounter: true,
        subscriptSizing: 'fixed',
        appearance: 'fill',
        type: 'textarea',
        minLength: 0,
        maxLength: 100,
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onPatternValueChange != null) {
            onPatternValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getMinLength(
    parentId: any,
    onMinLengthValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'minLength',
      selector: 'cl-input',
      name: 'minLength',
      layout: 'input',
      type: 'formField',
      properties: {
        id: 'minLength',
        name: 'minLength',
        label: 'Min length',
        floatLabel: 'auto',
        appearance: 'fill',
        subscriptSizing: 'fixed',
        inputType: 'number',
        type: 'input',
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onMinLengthValueChange != null) {
            onMinLengthValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getMaxLength(
    parentId: any,
    onMaxLengthValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'maxLength',
      name: 'maxLength',
      selector: 'cl-input',
      layout: 'maxLength',
      type: 'formField',
      properties: {
        id: 'maxLength',
        name: 'maxLength',
        label: 'Max length',
        floatLabel: 'auto',
        appearance: 'fill',
        subscriptSizing: 'fixed',
        inputType: 'number',
        type: 'input',
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onMaxLengthValueChange != null) {
            onMaxLengthValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getMinimum(
    parentId: any,
    onMinimumLengthValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'minimum',
      selector: 'cl-input',
      name: 'minimum',
      layout: 'input',
      type: 'formField',
      properties: {
        id: 'minimum',
        name: 'minimum',
        label: 'Minimum',
        floatLabel: 'auto',
        appearance: 'fill',
        subscriptSizing: 'fixed',
        inputType: 'number',
        type: 'input',
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onMinimumLengthValueChange != null) {
            onMinimumLengthValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getExclusiveMinimum(
    parentId: any,
    onExclusiveMinimumLengthValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'exclusiveMinimum',
      selector: 'cl-radio',
      name: 'exclusiveMinimum',
      layout: 'radio',
      type: 'formField',
      properties: {
        id: 'exclusiveMinimum',
        name: 'exclusiveMinimum',
        label: 'Exclusive Minimum',
        type: 'radio',
        style: {
          cssClasses: '',
          labelCssClasses: 'text-md',
          contentWidth: '',
          justifyContent: '',
          alignContent: '',
        },
        options: [
          {
            text: 'Yes',
            value: 'Yes',
            checked: true,
          },
          {
            text: 'No',
            value: 'No',
            checked: false,
          },
        ],
        display: 'flex-row',
        radioStyle: 'cl-radio-button',
        onValueChanged: (value: any) => {
          console.log(value);
          if (onExclusiveMinimumLengthValueChange != null) {
            onExclusiveMinimumLengthValueChange(parentId, value);
          }
        },
      },
    };

    return cloneDeep(json);
  }

  getMaximum(
    parentId: any,
    onMaximumLengthValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'maximum',
      selector: 'cl-input',
      name: 'maximum',
      layout: 'input',
      type: 'formField',
      properties: {
        id: 'Maximum',
        name: 'maximum',
        label: 'Maximum',
        floatLabel: 'auto',
        appearance: 'fill',
        subscriptSizing: 'fixed',
        inputType: 'number',
        type: 'input',
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        onValueChange: (val: any) => {
          console.log(val);
          if (onMaximumLengthValueChange != null) {
            onMaximumLengthValueChange(parentId, val);
          }
        },
      },
    };
    return cloneDeep(json);
  }

  getExclusiveMaximum(
    parentId: any,
    onExclusiveMaximumLengthValueChange?: (parentId: any, val: any) => void,
  ) {

    let json = {
      id: 'exclusiveMaximum',
      selector: 'cl-radio',
      name: 'exclusiveMaximum',
      layout: 'radio',
      type: 'formField',
      properties: {
        id: 'exclusiveMaximum',
        name: 'exclusiveMaximum',
        label: 'Exclusive Maximum',
        type: 'radio',
        style: {
          cssClasses: '',
          labelCssClasses: 'text-md',
          contentWidth: '',
          justifyContent: '',
          alignContent: '',
        },
        options: [
          {
            text: 'Yes',
            value: 'Yes',
            checked: true,
          },
          {
            text: 'No',
            value: 'No',
            checked: false,
          },
        ],
        display: 'flex-row',
        radioStyle: 'cl-radio-button',
        onValueChanged: (value: any) => {
          console.log(value);
          if (onExclusiveMaximumLengthValueChange != null) {
            onExclusiveMaximumLengthValueChange(parentId, value);
          }
        },
      },
    };

    return cloneDeep(json);
  }

  getArrayItemType(
    parentId: any,
    onArrayItemTypeValueChange?: (parentId: any, val: any) => void,
  ) {
    let json = {
      id: 'itemType',
      selector: 'cl-select',
      name: 'itemType',
      type: 'formField',
      layout: 'select',
      properties: {
        id: 'itemType',
        name: 'itemType',
        label: 'Item type',
        appearance: 'fill',
        subscriptSizing: 'fixed',
        type: 'select',
        onValueChange: (val: any) => {
          if (onArrayItemTypeValueChange != null) {
            onArrayItemTypeValueChange(parentId, val);
          }
        },
        style: {
          cssClasses: 'flex-auto w-full',
          contentWidth: 'w-full',
          justifyContent: '',
          alignContent: '',
        },
        options: [
          {
            text: JsonFieldTypes.string,
            value: JsonFieldTypes.string,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.number),
            value: JsonFieldTypes.number,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.boolean),
            value: JsonFieldTypes.boolean,
          },
          {
            text: this.capitalizeFirstLetter(JsonFieldTypes.object),
            value: JsonFieldTypes.object,
          },
        ],
      },
    };
    return cloneDeep(json);
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  getAddArrayItemButtonProperties(onClickAddChildren: () => void) {
    let childAddButtonProperties: ClButtonProperties =
      this.propertyFactory.generateProperty(ClComponentTypes.button);
    childAddButtonProperties.label = 'Add array item properties';
    childAddButtonProperties.icon = 'heroicons_outline:plus-circle';
    childAddButtonProperties.style!.iconCssClasses = 'text-primary-400';
    childAddButtonProperties.style!.labelCssClasses = 'text-primary-400';
    childAddButtonProperties.style!.cssClasses =
      'flex w-full border border-dashed border-primary-400 ';
    childAddButtonProperties.onSubmit = onClickAddChildren.bind(this);
    return cloneDeep(childAddButtonProperties);
  }
  getAddNestedFieldButtonProperties(onClickAddNestedField: () => void) {
    let childAddButtonProperties: ClButtonProperties =
      this.propertyFactory.generateProperty(ClComponentTypes.button);
    childAddButtonProperties.label = 'Add nested field';
    childAddButtonProperties.icon = 'heroicons_outline:plus-circle';
    childAddButtonProperties.style!.iconCssClasses = 'text-primary-400';
    childAddButtonProperties.style!.labelCssClasses = 'text-primary-400';
    childAddButtonProperties.style!.cssClasses =
      'flex w-full border border-dashed border-primary-400 ';
    childAddButtonProperties.onSubmit = onClickAddNestedField.bind(this);
    return cloneDeep(childAddButtonProperties);
  }

  getNodeJson(id: any) {
    let json = {
      id: id,
      fieldName: '',
      fieldType: '',
      required: 'Yes',
      pattern: '',
      minLength: '',
      maxLength: '',
      minimum: '',
      exclusiveMinimum: '',
      maximum: '',
      exclusiveMaximum: '',
      itemType: '',
      nodes: [],
    };
    return cloneDeep(json);
  }
}
