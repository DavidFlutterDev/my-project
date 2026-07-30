import { Router } from '@angular/router';
import { inject, Injectable, input, signal } from '@angular/core';
import {
  ClCardProperties,
  ClAccordionProperties,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClInputProperties,
  ClInputType,
  ClSelectProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
  ClLabelProperties,
  ClIconProperties,
} from '@clay/ui-components/basic';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiVariables } from '../../utils/api.variables';
import { MatDialog } from '@angular/material/dialog';
import { UpdateorchestrationdetailspopupComponent } from '../update-orchestration-details-popup/update-orchestration-details-popup.component';
import { componentKeys } from './add-orchestration-enums';
import {
  DataMapperNode,
  DataMapping,
} from '../data-mapper/properties/data-mapper.properties';
import { ReplaySubject, take, takeLast } from 'rxjs';
import { DataMapperService } from '../data-mapper/data-mapper.service';
import { GlobalVariables } from '../../utils/global.variables';
import { cloneDeep } from 'lodash';
import { RoutingVariables } from '../../utils/routing.variables';
import { firstValueFrom } from 'rxjs';
import { DOMHelper } from '../../utils/DOM-helper';
import { HyperlinkComponent } from '../../templates/hyperlink/hyperlink.component';
import { BreadcrumbComponent } from '../../templates/breadcrumb/breadcrumb.component';

@Injectable()
export class AddorchestrationService {
  protected readonly dataMapperService: DataMapperService =
    inject(DataMapperService);

  constructor(
    public router: Router,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
    public dialog: MatDialog,
  ) { }
  breadcrumbData = [
    {
      label: 'Orchestration',
      routeUrl: RoutingVariables.orchestrationRoute
    },
    {
      label: 'Add new',
    },
  ];
  public card0Properties: ClCardProperties = {
    id: `card0`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: 'h-[75vh]',
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium`,
    },
  };
  public form_21FormValue = signal<any>({});
  public orchestration_nameProperties: ClInputProperties = {
    id: `orchestration_name`,
    label: `Orchestration name`,
    floatLabel: `auto`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
    },
  };
  public processCodeProperties: ClInputProperties = {
    id: `process_code`,
    label: `Process code`,
    floatLabel: `auto`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    minLength: 0,
    maxLength: 10,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
    },
  };
  public productCodeProperties: ClInputProperties = {
    id: `product_code`,
    label: `Product code`,
    floatLabel: `auto`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    inputType: ClInputType.text,
    type: ClComponentTypes.input,
    minLength: 0,
    maxLength: 10,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
    },
  };

  public Orchestration_templateProperties: ClSelectProperties = {
    id: `Orchestration_template`,
    label: `Orchestration template`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    type: ClComponentTypes.select,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
    },
    onValueChange: this.onOrchestrationTemplateChange.bind(this),
    options: [
      // { text: 'Option 1', value: 'option1' },
      // { text: 'Option 2', value: 'option2' },
    ],
  };

  selectedOrchestrationTemplate?: any;
  onOrchestrationTemplateChange(val: any) {
    this.selectedOrchestrationTemplate =
      this.Orchestration_templateProperties.options?.find(
        (item) => item.value === val,
      );
    console.log(this.selectedOrchestrationTemplate);
  }

  public NoOfInstaceProperties: ClInputProperties = {
    id: `noOfInstance`,
    label: `No. of instances`,
    floatLabel: `auto`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    inputType: ClInputType.number,
    type: ClComponentTypes.input,
    min: 1,
    style: {
      cssClasses: `flex-auto w-full`,
      contentWidth: `w-full`,
    },
  };

  public templateTypeLabelProperties: ClLabelProperties = {
    id: `templateTypeLabel`,
    label: `This template type is:  `,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-neutral-700 text-sm font-normal`,
    },
  };
  getTemplateTypeValueProperties(val: string) {
    return {
      id: `templateTypeValue`,
      label: `\u00A0${val}`,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-neutral-800 text-sm font-bold`,
      },
    };
  }

  getSelectedTemplateValue() {
    return this.Orchestration_templateProperties.options?.find(
      (option) => option.value === this.formData.Orchestration_template,
    );
  }

  setSelectedTemplateValueById() {
    this.form_21FormValue().Orchestration_template =
      this.getSelectedTemplateValue()?.value;
  }

  public continueBtDisabled = signal<boolean>(true);
  public continueBtProperties: ClButtonProperties = {
    id: `continueBt`,
    label: `Continue`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary top-2`,
    },
    disabled: this.continueBtDisabled,
  };

  public showDataMapperScreen = new BehaviorSubject<boolean>(false);

  updateAccordionHeader(orchName: string,) {
    this.orchestrationName =  orchName ?? 'Accordion';
    this.accordion0Accordion1HeaderProperties.label = orchName ?? 'Accordion';
    this.breadcrumbData
  }

  public accordion0Properties: ClAccordionProperties = {
    id: `accordion0`,
    hideToggle: true,
    openMultiple: false,
    type: ClComponentTypes.accordion,
    style: {
      contentWidth: `w-full`,
      iconCssClasses: `icon-size-5`,
      cssClasses: `flex-auto align-items-center justify-between`,
      titleCssClasses: `text-xl font-normal text-primary-800 accordion-label`,
    },
    collapsedIcon: `fss_icons:chevron-circle-down`,
    expandedIcon: `fss_icons:chevron-circle-up-filled`,
  };

  orchestrationName ?: string  ;
  public accordion0Accordion1HeaderProperties = {
    label: `Accordion`,
    panelOpenState: false,
    hideDefaultHeader: false,
   
    actionIcons: [
      {
        id: 'editIcon',
        type: ClComponentTypes.icon,
        iconName: 'heroicons_solid:pencil',
        style: { cssClasses: 'text-primary-600 cursor-pointer' },
        onIconClicked: this.openEditDialog.bind(this),
      },
    ],
  };

  
  getSubHeadingInAccordionProperties(label: any) {
    return {
      id: `${label}Label`,
      label: label,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-neutral-700 font-normal text-sm `,
      },
    };
  }

  getValueInAccordionProperties(label: any) {
    return {
      id: `${label}ValueLabel`,
      label: label,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-base text-neutral-950 font-medium`,
      },
    };
  }

  public noOfInstanceLabelProperties: ClLabelProperties = {
    id: `noOfInstanceLable`,
    label: `No. Of Instances`,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-neutral-700 font-normal text-sm text-neutral-900`,
    },
  };

  public card2Properties: ClCardProperties = {
    id: `card2`,
    type: ClComponentTypes.card,
    style: {
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
    // onCardClicked: this.onTapContinue.bind(this),
  };
  public tickIconProperties: ClIconProperties = {
    id: `tickIcon`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-6 text-green-500`,
    },
    iconName: `heroicons_solid:check-circle`,
  };

  getLabel4Properties(label: string): ClLabelProperties {
    return {
      id: `label4`,
      label: DOMHelper.replaceUnderScoreWithSpace(label),
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-neutral-950 text-base font-semibold`,
      },
    };
  }

  public getIndexLabelProperties(index: any): ClLabelProperties {
    return {
      id: 'indexLabel',
      label: (index + 1).toString(),
      type: ClComponentTypes.label,
      style: {
        contentWidth: 'w-full',
        cssClasses:
          this.configSteps.length == 1
            ? 'font-normal text-sm text-neutral-100 p-2'
            : index == 0 || this.configSteps[index - 1]?.pipelineId
              ? 'font-normal text-sm text-neutral-100 p-2'
              : 'font-normal text-sm text-neutral-700 p-2',
      },
    };
  }
  public getIndexBGProperties(index: any) {
    var temp =
      'w-5 h-5 rounded-full aspect-square flex items-center justify-center border';
    if (
      index == 0 ||
      this.configSteps.length == 1 ||
      this.configSteps[index - 1]?.pipelineId
    ) {
      temp += ' border-[#2D78E8]  bg-[#2D78E8]';
    } else {
      temp += ' border-[#D7D9DD]  bg-transparent ';
    }
    return temp;
    // return {
    //   class:
    //     'w-5 h-5 rounded-full aspect-square flex items-center justify-center border border-[#2D78E8]',
    //   ngStyle:
    //     "{'background-color':orchestrationTemplateData().structure.steps[i - 1]?.pipelineId ? '#2D78E8' : 'transparent'}",
    // };
  }

  public label5Properties: ClLabelProperties = {
    id: `label5`,
    label: `Extracts and processes fee information.`,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `font-normal text-sm text-neutral-900`,
    },
  };
  public rightArrowProperties: ClIconProperties = {
    id: `rightArrow`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
    },
    iconName: `heroicons_outline:chevron-right`,
  };

  public icon3Properties: ClIconProperties = {
    id: `icon3`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
    },
    iconName: `heroicons_mini:clipboard`,
  };

  getHintTextProperties(label: any) {
    return {
      id: `hintText`,
      label: `In this “${DOMHelper.replaceUnderScoreWithSpace(label)}” template the listed pipelines at the left hand side are need to be configured in a sequence order.`,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-neutral-700 text-sm font-normal`,
      },
    };
  }

  public card3Properties: ClCardProperties = {
    id: `card3`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `h-max`,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };

  public async checkOrchestrationName(name: string): Promise<any> {
    try {
      const data: any = await firstValueFrom(
        this.apiClient.getDetailsApi(
          `${ApiVariables.orchestrations_url}/${ApiVariables.check_orchestation_name_url}?orchestrationName=${name}`,
        ),
      );

      if (data.status === '0000') {
        return data.detail?.isOrchestrationNameTaken ?? true;
      } else {
        var jsonKeys = Object.keys(data.detail);
        this.commonToastService.showErrorToast(
          data.detail[jsonKeys.toString()] ?? 'Failed',
        );
        return;
      }
    } catch (error: any) {
      this.commonToastService.showErrorToast(error.toString());
      return;
    }
  }


  updateBreadcrumbData(orchestationName: any) {
    this.breadcrumbData[1].label = orchestationName;
    this.breadcrumbData.push({ label: 'Edit orchestration' });
  }

  configSteps: any[] = [];
  formData: any = {};
  public getOrchestrationById(id: any) {
    // this.dataGrid0Properties.showLoading = true;
    this.apiClient
      .getDetailsApi(ApiVariables.orchestrations_url, id)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.orchestrationDetails = data.detail;
            this.configSteps = data.detail.config.steps;
            if (data.detail.config.steps.length > 0) {
              this.updateAccordionHeader(data.detail.orchestrationsName);
              this.updateBreadcrumbData(data.detail.orchestrationsName)


              this.formData = {
                orchestration_name: data.detail.orchestrationsName,
                product_code: data.detail.productCode,
                process_code: data.detail.processCode,
                noOfInstance: data.detail.noOfInstances,
                Orchestration_template:
                  data.detail.orchestrationTemplateDetail
                    .orchestrationTemplatesId,
              };
              this.onOrchestrationTemplateChange(
                data.detail.orchestrationTemplateDetail
                  .orchestrationTemplatesId,
              );
              this.getTemplateDetails(data.detail.config.steps);
            }
          } else {
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }



  public getOrchestrationTemplateList() {
    this.apiClient
      .getListapi(ApiVariables.orchestrations_templates_url)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.setTemplateData(data);
          } else {
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  componentsList?: any = [];
  public getComponentsList() {
    this.apiClient.getDetailsApi(ApiVariables.components_url).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.componentsList = data.detail.content;
        } else {
          var jsonKeys = Object.keys(data.detail);
          this.commonToastService.showErrorToast(
            data.detail[jsonKeys.toString()] ?? 'Failed',
          );
        }
      },
      error: (err: any) => {
        console.log(err);
        this.commonToastService.showErrorToast(err.toString());
      },
    });
  }

  public orchestrationTemplateData = signal<any>({});

  public getOrchestrationTemplateDetails(id: any) {
    this.selectedTemplateIndex.next(0);
    this.apiClient
      .getDetailsApi(ApiVariables.orchestrations_templates_url, id)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            // add data mapping configration here
            this.orchestrationTemplateData.set(data.detail);
            this.configSteps = data.detail.structure.steps;
            if (data.detail.structure.steps.length > 0) {
              this.getTemplateDetails(data.detail.structure.steps);
            }
          } else {
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  savedPipelineData: any = [];
  public createPipeline(pipelineConfig: any) {
    let tempSelectedTemplateDetails: any;
    this.selectedTemplateDetails.pipe(take(1)).subscribe((value) => {
      tempSelectedTemplateDetails = value;
    });
    this.continueBtDisabled.set(true);

    var body: any = {
      templateId: tempSelectedTemplateDetails.templatesId,
      pipelineName: this.configSteps[this.selectedTemplateIndex.getValue()]
        .pipelineId
        ? tempSelectedTemplateDetails.pipelineName
        : `${tempSelectedTemplateDetails.templateName}_${Date.now()}`,
      pipelineConfig: pipelineConfig,
      productCode: this.formData.product_code,
      processCode: this.formData.process_code,
      institutionCode: GlobalVariables.institutionCode,
      status: GlobalVariables.status,
      tenantCode: GlobalVariables.tenantCode,
      dmlBy: GlobalVariables.dmlBy,
    };
    let pipelinesId =
      this.configSteps[this.selectedTemplateIndex.getValue()].pipelineId ??
      undefined;
    if (pipelinesId) {
      body.pipelinesId =
        this.configSteps[this.selectedTemplateIndex.getValue()].pipelineId;
    }

    this.apiClient
      .saveDataApi(ApiVariables.pipeline_url, body, pipelinesId)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.savedPipelineData.push(data.detail);
            this.commonToastService.showSuccessToast(
              `${DOMHelper.replaceUnderScoreWithSpace(this.configSteps[this.selectedTemplateIndex.getValue()].templateName)} saved successfully.`,
            );
            //  if the orchestation is already create then just enable the continue button after success
            if (this.orchestrationDetails && pipelinesId) {
              this.continueBtDisabled.set(false);
            } else {
              // create or update the orchestration
              this.createOrchestration(data.detail.pipelinesId);
            }
          } else {
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
            this.continueBtDisabled.set(false);
          }
        },
        error: (err: any) => {
          this.continueBtDisabled.set(false);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  orchestrationDetails?: any;
  createOrchestration(pipelinesId: any) {
    this.configSteps[this.selectedTemplateIndex.getValue()].pipelineId =
      pipelinesId;

    var body: any = {
      orchestrationTemplatesId: this.formData.Orchestration_template,
      orchestrationsName: this.formData.orchestration_name,
      config: { steps: this.configSteps },
      productCode: this.formData.product_code,
      processCode: this.formData.process_code,
      institutionCode: GlobalVariables.institutionCode,
      status: GlobalVariables.status,
      tenantCode: GlobalVariables.tenantCode,
      dmlBy: GlobalVariables.dmlBy,
    };
    if (this.formData.noOfInstance) {
      body.noOfInstances = this.formData.noOfInstance;
    }
    if (this.orchestrationDetails) {
      body.orchestrationsId = this.orchestrationDetails.orchestrationsId;
    }
    this.apiClient
      .saveDataApi(
        ApiVariables.orchestrations_url,
        body,
        this.orchestrationDetails?.orchestrationsId ?? null,
      )
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            console.log(data.detail);
            this.configSteps = data.detail.config.steps;

            // if (!this.orchestrationDetails) {
            //   this.commonToastService.showSuccessToast(
            //     `Orchestration name ${this.formData.orchestration_name} has been added successfully.`,
            //   );
            // }
            this.orchestrationDetails = data.detail;
            this.continueBtDisabled.set(false);

            if (!this.jumpToNextTemplate()) {
              this.commonToastService.showSuccessToast(
                `Orchestration created successfully`,
              );
              // `Orchestration  "${this.formData.orchestration_name}" has been added successfully.`,
              this.router.navigate([RoutingVariables.orchestrationRoute]);
            }
          } else {
            this.continueBtDisabled.set(false);
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.continueBtDisabled.set(false);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  dataMapperJson = new ReplaySubject<any>();
  selectedTemplateDetails = new ReplaySubject<any>(1);
  selectedTemplateIndex = new BehaviorSubject<number>(0);

  jumpToNextTemplate(): boolean {
    let config = cloneDeep(this.configSteps);
    if (this.selectedTemplateIndex.getValue() < config.length - 1) {
      let newIndex = this.selectedTemplateIndex.getValue() + 1;
      this.onClickTemplateTile(newIndex);
      return true;
    } else {
      return false;
    }
  }
  onClickTemplateTile(index: any) {
    this.selectedTemplateIndex.next(index);
    this.getTemplateDetails(this.configSteps);
  }

  public getTemplateDetails(steps: any) {
    let config = cloneDeep(steps);
    var id;
    var url;
    if (config[this.selectedTemplateIndex.getValue()]?.pipelineId) {
      url = ApiVariables.pipeline_url;
      id = config[this.selectedTemplateIndex.getValue()]?.pipelineId;
      this.continueBtProperties.label = 'Update';
    } else {
      url = ApiVariables.template_url;
      id = config[this.selectedTemplateIndex.getValue()]?.templateId;
      this.continueBtProperties.label = 'Continue';
    }
    this.apiClient.getDetailsApi(url, id).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          // add data mapping configration here
          this.dataMapperJson.next(null);
          this.selectedTemplateDetails.next(data.detail);
          this.showDataMapperScreen.next(true);
          this.setDataMapper(data.detail);
        } else {
          var jsonKeys = Object.keys(data.detail);
          this.commonToastService.showErrorToast(
            data.detail[jsonKeys.toString()] ?? 'Failed',
          );
        }
      },
      error: (err: any) => {
        this.commonToastService.showErrorToast(err.toString());
      },
    });
  }

  setDataMapper(response: any) {
    let tempDataPipeline;
    tempDataPipeline = this.generateDataMapperJson(
      response['pipelineConfig'] ?? response['structure'],
    );

    setTimeout(() => {
      console.log(100, tempDataPipeline);
      this.dataMapperJson.next(tempDataPipeline as DataMapping);
    });
  }

  public setTemplateData(data: any) {
    let tempTemplateData = [];

    for (let i = 0; i < data.detail.content.length; i++) {
      let obj = {
        value: data.detail.content[i].orchestrationTemplatesId,
        text: data.detail.content[i].orchestrationTemplateName,
        type: data.detail.content[i].type,
      };
      tempTemplateData.push(obj);
    }

    this.Orchestration_templateProperties.options = tempTemplateData;
    if (this.formData.Orchestration_template) {
      this.onOrchestrationTemplateChange(this.formData.Orchestration_template);
    }
  }

  openEditDialog(): void {
    console.log(this.formData);
    const dialogRef = this.dialog.open(
      UpdateorchestrationdetailspopupComponent,
      {
        width: '500px',
        data: {
          orchestrationDetails: this.orchestrationDetails,
          orchestrationId: this.orchestrationDetails?.orchestrationsId,
          orchestration_name: this.formData.orchestration_name,
          templateId: this.formData.Orchestration_template,
          noOfInstance: this.formData.noOfInstance,
          templateList: this.Orchestration_templateProperties.options,
          process_code: this.formData.process_code,
          product_code: this.formData.product_code,
        },
      },
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined && data !== null) {
        this.Orchestration_templateProperties.options = data.templateList;
        if (
          this.form_21FormValue().orchestration_name !== data.orchestration_name
        ) {
          this.form_21FormValue().orchestration_name = data.orchestration_name;
        }
        if (
          this.form_21FormValue().Orchestration_template !== data.templateId
        ) {
          this.form_21FormValue().Orchestration_template = data.templateId;
          this.onOrchestrationTemplateChange(data.templateId);
        }
        if (this.form_21FormValue().noOfInstance !== data.noOfInstance) {
          this.form_21FormValue().noOfInstance = data.noOfInstance;
        }
        if (this.form_21FormValue().product_code !== data.product_code) {
          this.form_21FormValue().product_code = data.product_code;
        }
        if (this.form_21FormValue().process_code !== data.process_code) {
          this.form_21FormValue().process_code = data.process_code;
        }

        this.accordion0Accordion1HeaderProperties.label =
          this.form_21FormValue().orchestration_name;

        this.formData = cloneDeep(this.form_21FormValue());
      } else {
        // Canceled
        console.log('Edit cancelled');
      }
    });
  }

  // Main function to generate the structure
  generateDataMapperJson(config: any) {
    return {
      id: this.dataMapperService.generateUniqueId(),
      sources: [this.processDataMapperNode(config.input, '', 'Input')],
      destination: this.processDataMapperNode(config.output, '', 'Output'),
      processes: (config.processors || [])
        .map((child: any) => this.processDataMapperNode(child, '', 'Processor'))
        .filter(Boolean),
    };
  }

  // Recursive function to process nodes
  processDataMapperNode(
    node: any,
    parentId: string,
    category: string,
  ): DataMapperNode | null {
    if (!node || typeof node !== 'object') return null;

    var key: any;
    var value: any;
    let newNode: DataMapperNode;
    var type: any;

    if (
      (Object.keys(node).includes(componentKeys.processors) &&
        Object.keys(node).includes(componentKeys.condition)) ||
      (Object.keys(node).includes(componentKeys.processors) &&
        Object.keys(node).includes(componentKeys.path) &&
        Object.keys(node).includes(componentKeys.http_method))
    ) {
      key = componentKeys.processors;
      value = node;
    } else {
      key = Object.keys(node)[0];
      value = node[key];
    }

    newNode = {
      id: this.dataMapperService.generateUniqueId(),
      type: 'single',
      label: key,
      icon: this.dataMapperService.getDataMapperIcon(key),
      parentId: parentId || undefined,
      category: category,
    };

    if (
      key !== componentKeys.switch &&
      key !== componentKeys.http_controller &&
      key !== componentKeys.try &&
      key !== componentKeys.catch &&
      key !== componentKeys.sequential &&
      key !== componentKeys.fallback
    ) {
      if (
        key == componentKeys.output ||
        (Object.keys(node).includes(componentKeys.processors) &&
          Object.keys(node).includes(componentKeys.condition))
      ) {
        type = componentKeys.treeCondition;
        newNode.label = node[componentKeys.condition];
      } else if (
        Object.keys(node).includes(componentKeys.processors) &&
        Object.keys(node).includes(componentKeys.path) &&
        Object.keys(node).includes(componentKeys.http_method)
      ) {
        type = componentKeys.treeCondition;
        newNode.label = `${node[componentKeys.http_method]}/${node[componentKeys.path]}`;
      } else {
        newNode.data = value;
        type = componentKeys.single;
        if (
          this.configSteps[this.selectedTemplateIndex.getValue()]?.pipelineId ||
          this.getNodeFormType(newNode) === 'NONE'
        ) {
          newNode.isDataValid = true;
        }
      }
    } else {
      if (
        key === componentKeys.switch ||
        key === componentKeys.http_controller
      ) {
        type = componentKeys.tree;
      } else {
        type = componentKeys.group;
      }
      newNode.isDataValid = true;
    }
    newNode.type = type;

    if (
      Array.isArray(
        value?.outputs || value?.processors || value?.cases || value?.services,
      )
    ) {
      newNode['children'] = (
        value.outputs ||
        value.processors ||
        value.cases ||
        value?.services
      )
        .map((child: any) =>
          this.processDataMapperNode(child, newNode['id'], category),
        )
        .filter(Boolean);
    } else if (key == componentKeys.output) {
      const child = this.processDataMapperNode(
        node[componentKeys.output],
        parentId,
        category,
      );
      if (child) {
        newNode['children'] = [child];
      }
    }
    return newNode;
  }

  getNodeFormType(node: any): string {
    for (let component of this.componentsList) {
      if (
        node.label === component.name &&
        node.category.toLowerCase() === component.type.toLowerCase()
      ) {
        return component.formType;
      }
    }
    return 'NONE';
  }

  reverseDataMapperJson(mappedJson: any) {
    var obj: any = {
      input: this.reverseProcessNode(mappedJson.sources[0]),
      processors: mappedJson.processes.map((proc: any) =>
        this.reverseProcessNode(proc, 'processor'),
      ),
    };
    // only if the destination values are available adding output
    if (mappedJson.destination) {
      obj['output'] = this.reverseProcessNode(mappedJson.destination, 'output');
    }

    return obj;
  }

  splitAtFirstSlash(input: string) {
    let index = input.indexOf('/');
    if (index === -1) return [input]; // Return the original string if no '/' is found

    return [input.substring(0, index), input.substring(index)];
  }
  // recursive function
  reverseProcessNode(
    node: any,
    category: 'output' | 'processor' | null = null,
  ) {
    if (!node) return null;

    let reconstructedNode: any = {};

    // handle switch cases
    if (node.type === 'tree' && node.children) {
      if (node.label === componentKeys.http_controller) {
        reconstructedNode[node.label] = {
          services: node.children.map((child: any) => {
            return {
              http_method: this.splitAtFirstSlash(child?.label)[0],
              path: this.splitAtFirstSlash(child?.label)[1],
              processors: Array.isArray(child.children)
                ? child.children.map((subChild: any) =>
                  this.reverseProcessNode(subChild, category),
                )
                : [],
            };
          }),
        };
      } else {
        reconstructedNode[node.label] = {
          cases: node.children.map((child: any) => ({
            condition: child.label || '',
            ...(category === 'output'
              ? {
                output:
                  this.reverseProcessNode(child.children?.[0], category) ||
                  {},
              } //  object for output
              : {
                processors: Array.isArray(child.children)
                  ? child.children.map((subChild: any) =>
                    this.reverseProcessNode(subChild, category),
                  )
                  : [],
              }), // Array for processors
          })),
        };
      }
    }
    // Handle fallback (outputs)
    else if (node.type === 'group' && node.children) {
      if (category === 'output') {
        reconstructedNode[node.label] = {
          outputs: node.children.map((child: any) =>
            this.reverseProcessNode(child, category),
          ),
        };
      } else if (category === 'processor') {
        reconstructedNode[node.label] = {
          processors: node.children.map((child: any) =>
            this.reverseProcessNode(child, category),
          ),
        };
      }
    }

    // General case: Restore node with data
    else {
      reconstructedNode[node.label] = { ...node.data };
    }

    return reconstructedNode;
  }

  isStructureValid(tree: DataMapperNode[]): boolean {
    for (let node of tree) {
      // If any node's isValid flag is false, return false immediately
      if (!node.isDataValid && node.type === 'single') {
        return false;
      } else if (
        (node.type === 'group' ||
          node.type === 'tree' ||
          node.type === 'treeCondition') &&
        node.children?.length === 0
      ) {
        return false;
      }

      // If the node has children, recurse through them
      if (node.children && node.children.length > 0) {
        // If any child node is invalid, return false
        if (!this.isStructureValid(node.children)) {
          return false;
        }
      }
    }

    // If all nodes are valid, return true
    return true;
  }
}
