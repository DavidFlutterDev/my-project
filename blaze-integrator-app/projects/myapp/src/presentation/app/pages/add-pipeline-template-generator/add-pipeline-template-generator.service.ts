import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClCardProperties } from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClInputProperties,
  ClInputType,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
  ClToastService,
  ClRadioProperties,
  ClDisplay,
} from '@clay/ui-components/basic';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { RoutingVariables } from '../../utils/routing.variables';

@Injectable({
  providedIn: 'root',
})
export class AddpipelinetemplategeneratorService {
  constructor(private apiClient: ApiClient) {}
  // private http: HttpClient = inject(HttpClient);
  breadcrumbData = [
    {
      label: 'Pipeline template generator',
      routeUrl: RoutingVariables.pipelineTemplateListRoute,
    },
    {
      label: 'Add new',
    },
  ];
  public card0Properties: ClCardProperties = {
    id: 'card0',
    type: ClComponentTypes.card,
    style: {
      cssClasses: '',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: '',
      labelCssClasses: 'text-2xl md:text-3xl font-medium  ',
    },
  };
  public nameProperties: ClInputProperties = {
    id: 'name',
    label: 'Pipeline template name',
    floatLabel: 'auto',
    appearance: 'fill',
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    style: {
      cssClasses: 'flex-auto w-full mb-4',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: '',
    },
    optional: false,
    minLength: 1,
    maxLength: 100,
  };
  public structureProperties: ClInputProperties = {
    id: 'structure',
    label: '',
    floatLabel: 'auto',
    appearance: 'outline',
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    style: {
      cssClasses: 'flex-auto w-full bg-black text-white mt-8',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: '',
    },
    placeholder: 'Enter json code here',
    optional: false,
  };
  public saveButtonDisabled = signal<boolean>(true);
  public saveButtonProperties: ClButtonProperties = {
    id: 'saveButton',
    label: 'Save',
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.submit,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: 'mat-primary top-2 justify-end',
      contentWidth: '',
      justifyContent: '',
      alignContent: 'items-end',
    },
    disabled: this.saveButtonDisabled,
    // onSubmit: this.saveTemplate.bind(this),
  };

  public nameFormValue: any;
  public jsonFormValue: any;

  public typeProperties: ClRadioProperties = {
    id: `type`,
    label: `Type`,
    type: ClComponentTypes.radio,
    style: {
      labelCssClasses: `text-md`,
    },
    options: [
      { text: 'Online', value: 'Online', checked: true },
      { text: 'Offline', value: 'Offline', checked: false },
    ],
    display: ClDisplay.row,
    radioStyle: `cl-radio-button`,
  };
}
