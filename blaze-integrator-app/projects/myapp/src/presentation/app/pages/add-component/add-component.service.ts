import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClCardProperties } from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClInputProperties,
  ClInputType,
  ClSelectProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
} from '@clay/ui-components/basic';
import {
  ClDataMapperNode,
  ClDataMapping,
} from 'projects/myapp/src/properties/data-mapper.properties';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { ApiVariables } from '../../utils/api.variables';
import { PipelinesDataModel } from '../../models/pipelinesdatamodel';
import { CommonToastService } from '../common-services/common-toast.services';
import { componentKeys } from './add-component-enums';

@Injectable({
  providedIn: 'root',
})
export class AddcomponentService {
  constructor (
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) { }

  private http: HttpClient = inject(HttpClient);

  public saveTemplate() {
    this.http
      .post('baseUrl/template', {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (response: any) => {
          undefined;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  public card0Properties: ClCardProperties = {
    id: `card0`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: '',
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
      labelCssClasses: `text-2xl md:text-3xl font-medium`,
    },
  };

  public form_1FormValue = signal<PipelinesDataModel>({});

  public input1Properties: ClInputProperties = {
    id: `input1`,
    label: `Pipeline name`,
    floatLabel: `auto`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
    },
    optional: false,
    minLength: 1,
    maxLength: 100,
  };

  public templateDropdownProperties: ClSelectProperties = {
    id: `templateDropdown`,
    label: `Pipeline template `,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    type: ClComponentTypes.select,
    style: {
      cssClasses: `flex-auto w-full mb-4`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
    },
    options: [
      // { text: 'kafka 1', value: 'kafka1', selected: false },
      // { text: 'kafka 2', value: 'kafka 2' },
    ],
    optional: false,
  };

  public continueButtonDisabled = signal<boolean>(true);

  public continueButtonProperties: ClButtonProperties = {
    id: `continueButton`,
    label: 'Continue',
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.submit,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary top-2 absolute right-0 bottom-0`,
      contentWidth: ``,
      justifyContent: ``,
      alignContent: ``,
    },
    // onSubmit: this.saveTemplate.bind(this),
    // disabled: this.continueButtonDisabled,
  };



  transformDataAsTransformations(processor: any[], idCounter = { count: 1 }): any[] {
    const transformations: any[] = [];

    processor.forEach((item) => {
      const label = Object.keys(item)[0]; // Extract the key (e.g., "xml_parser", "sequential", etc.)
      transformations.push({
        id: idCounter.count++, // Generate an ID and increment the counter
        label
      });

      // If the key has an `output` array, process it recursively
      if (item[label]?.output && Array.isArray(item[label].output)) {
        transformations.push(...this.transformDataAsTransformations(item[label].output, idCounter));
      }
    });

    return transformations;
  }

  public inputNodes: ClDataMapperNode[] = [];

  public outputNodes: ClDataMapperNode[] =[];

  public dataMapping: ClDataMapping[] = [];

  public getTemplateList() {
    // this.dataGrid0Properties.showLoading = true;
    this.apiClient.getListapi(ApiVariables.template_url).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.setTemplateData(data);
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

  public setTemplateData(data: any) {
    let tempTemplateData = [];

    for (let i = 0; i < data.detail.content.length; i++) {
      let obj = {
        value: data.detail.content[i].templatesId,
        text: data.detail.content[i].templateName,
      };
      tempTemplateData.push(obj);
    }

    this.templateDropdownProperties.options = tempTemplateData;
  }

  // Main function to generate the structure
  generateDataMapperJson(config: any) {
    return {
      // id: Date.now().toString(),
      id: this.generateUniqueId(),
      sources: [this.processDataMapperNode(config.input)],
      destination: this.processDataMapperNode(config.output),
      processes: (config.processors || [])
        .map((child: any) => this.processDataMapperNode(child))
        .filter(Boolean),
    };
  }

  // Recursive function to process nodes
  processDataMapperNode(node: any, parentId = null) {
    if (!node || typeof node !== 'object') return null;

    var key: any;
    var value: any;
    let newNode: Record<string, any>;
    var type: any;

    if (
      Object.keys(node).includes(componentKeys.processors) &&
      Object.keys(node).includes(componentKeys.condition)
    ) {
      key = componentKeys.processors;
      value = node;
    } else {
      key = Object.keys(node)[0];
      value = node[key];
    }

    newNode = {
      id: this.generateUniqueId(),
      label:  key,
      icon: 'heroicons_outline:question-mark-circle',
      parentId: parentId || undefined,
    };

    if (
      key !== componentKeys.switch &&
      key !== componentKeys.sequential &&
      key !== componentKeys.fallback
    ) {
      if (
        key == componentKeys.output ||
        (Object.keys(node).includes(componentKeys.processors) &&
          Object.keys(node).includes(componentKeys.condition))
      ) {
        type = componentKeys.treeCondition;
        newNode['label'] =  node[componentKeys.condition] ;
      } else {
        newNode['data'] = value;
        type = componentKeys.single;
      }
    } else {
      if (key === componentKeys.switch) {
        type = componentKeys.tree;
      } else {
        type = componentKeys.group;
      }
    }
    newNode['type'] = type;

    if (Array.isArray(value?.outputs || value?.processors || value?.cases)) {
      newNode['children'] = (value.outputs || value.processors || value.cases)
        .map((child: any) => this.processDataMapperNode(child, newNode['id']))
        .filter(Boolean);
    } else if (key == componentKeys.output) {
      newNode['children'] = [
        this.processDataMapperNode(node[componentKeys.output], parentId),
      ];
    }

    return newNode;
  }

  public generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;

        return v.toString(16);
      },
    );
  }


}
