import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ClCardProperties,
  ClDynamicTreeViewProperties,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClInputProperties,
  ClInputType,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
  ClLabelProperties,
  ClIconProperties,
  ClTextareaProperties,
  ClCodeViewProperties,
} from '@clay/ui-components/basic';
import { cloneDeep } from 'lodash-es';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import { JsonSchemaDataModel } from '../../models/jsonSchemaModel';
import { ApiVariables } from '../../utils/api.variables';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RoutingVariables } from '../../utils/routing.variables';

@Injectable()
export class AddjsonschemaService {
  constructor(
    public router: Router,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) {}
  breadcrumbData = [
    {
      label: 'Json schema generator',
      routeUrl: RoutingVariables.jsonSchemaListRoute,
    },
    {
      label: 'Add new',
    },
  ];

  private http: HttpClient = inject(HttpClient);
  public formCardProperties: ClCardProperties = {
    id: `formCard`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `flex-initial w-4/6`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public form_41FormValue = signal<JsonSchemaDataModel>({});
  public jsonSchemaNameProperties: ClInputProperties = {
    id: `jsonSchemaName`,
    label: `Json schema name`,
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
    optional: false,
    minLength: 1,
    maxLength: 100,
  };
  private previewButtonDisabled = signal<boolean>(false);
  public previewButtonProperties: ClButtonProperties = {
    id: `previewButton`,
    label: `Preview`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `top-2 border-blue-800`,
      contentWidth: ``,
      justifyContent: ``,
      alignContent: `items-end`,
    },
    disabled: this.previewButtonDisabled,
  };
  public saveDisabled = signal<boolean>(true);
  public saveProperties: ClButtonProperties = {
    id: `save`,
    label: `Save`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary top-2`,
      contentWidth: ``,
      justifyContent: ``,
      alignContent: `items-end`,
    },
    disabled: this.saveDisabled,
  };
  public previewCardProperties: ClCardProperties = {
    id: `previewCard`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `flex-initial w-2/6 min-h-96`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public previewProperties: ClLabelProperties = {
    id: `preview`,
    label: `Preview`,
    type: ClComponentTypes.label,
    style: {
      cssClasses: `text-base text-neutral-700 font-bold`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
    },
    showTooltip: false,
  };

  public zoomInProperties: ClIconProperties = {
    id: `zoomIn`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `feather:zoom-in`,
  };
  public zoomOutProperties: ClIconProperties = {
    id: `zoomOut`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `feather:zoom-out`,
  };
  public expandProperties: ClIconProperties = {
    id: `expand`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: 'icon-size-5 p-0.5 ml-2 bg-primary-100 rounded-sm',
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `feather:maximize-2`,
  };

  public codeViewProperties: ClCodeViewProperties = {
    id: 'codeView0',
    type: ClComponentTypes.codeView,
    label: '',
    // style: {
    //   cssClasses: 'flex-auto w-full',
    // },
    lang: 'json',
  };

  private readonly _propertyFactory: ClComponentPropertyFactory = inject(
    ClComponentPropertyFactory,
  );
  public readonly dynamicTreeViewProperties: ClDynamicTreeViewProperties =
    this._propertyFactory.generateProperty(ClComponentTypes.treeView);
  public readonly childAddButtonProperties =
    this._propertyFactory.generateProperty(ClComponentTypes.button);


  public validationSchemaData = new BehaviorSubject<any | null>(null); // Initial value is null

  getValidationSchemaById(id: any) {
    this.apiClient
      .getDetailsApi(ApiVariables.validation_schema_url, id)
      .subscribe({
        next: (data: any) => {
          // if (data.status == '0000') {
          if (data.status == '0000') {
            this.validationSchemaData.next(data.detail);
          } else {
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }
}
