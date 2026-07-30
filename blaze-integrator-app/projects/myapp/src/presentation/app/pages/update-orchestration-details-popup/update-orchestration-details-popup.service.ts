import { Router } from '@angular/router';
import { Inject, Injectable, signal } from '@angular/core';
import {
  ClIconProperties,
  ClLabelProperties,
  ClInputProperties,
  ClInputType,
  ClSelectProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
} from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ApiVariables } from '../../utils/api.variables';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { GlobalVariables } from '../../utils/global.variables';

@Injectable()
export class UpdateorchestrationdetailspopupService {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,

    @Inject(MAT_DIALOG_DATA) public recievedData: any,
    private dialogRef: MatDialogRef<UpdateorchestrationdetailspopupService>,
  ) {
    if (recievedData != null) {
      console.log('data: ', recievedData);
      setTimeout(() => {
        this.recievedData = recievedData;
        this.select1Properties.options = recievedData.templateList;
        if (recievedData.templateId) {
          this.onOrchestrationTemplateChange(recievedData.templateId);
        }

        this.form_26FormValue.set({
          input3: recievedData.orchestration_name,
          select1: recievedData.templateId,
          noOfInstance: recievedData.noOfInstance,
          product_code: recievedData.product_code,
          process_code: recievedData.process_code,
        });
      }, 100);
      // this.form_26FormValue()
    }
  }
  public editIconProperties: ClIconProperties = {
    id: `editIcon`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-8 text-cyan-400`,
    },
    iconName: `feather:edit`,
  };
  public popupTitleProperties: ClLabelProperties = {
    id: `popupTitle`,
    label: `Edit orchestration details`,
    type: ClComponentTypes.label,
    style: {
      cssClasses: `text-neutral-700 pl-2 font-semibold text-2xl text-primary-900`,
      contentWidth: `w-full`,
    },
    showTooltip: false,
  };
  public icon8Properties: ClIconProperties = {
    id: `icon8`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-6`,
    },
    iconName: `fss_icons:close-icon`,
    onIconClicked: () => {
      this.dialog.closeAll();
    },
  };
  public form_26FormValue = signal<any>({});
  public input3Properties: ClInputProperties = {
    id: `input3`,
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
    maxLength :10,
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
    maxLength :10,
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
  public select1Properties: ClSelectProperties = {
    id: `select1`,
    label: `Orchestration template`,
    appearance: `fill`,
    subscriptSizing: `fixed`,
    type: ClComponentTypes.select,
    disabled:true,
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
    console.log(val);
    this.selectedOrchestrationTemplate = this.select1Properties.options?.find(
      (item) => item.value === val,
    );
    console.log(this.selectedOrchestrationTemplate);
  }
  public updateDisabled = signal<boolean>(true);
  public updateProperties: ClButtonProperties = {
    id: `update`,
    label: `Update`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary`,
    },
    disabled: this.updateDisabled,
    onSubmit: this.onTapUpdate.bind(this),
  };
  form26?: NgForm;
  async onTapUpdate() {
    console.log(this.form26);
    this.updateDisabled.set(true);
    let isNameTaken: boolean;
    if (
      this.recievedData.orchestrationId &&
      this.form_26FormValue().input3 === this.recievedData.orchestration_name
    ) {
      isNameTaken = false;
    } else {
      isNameTaken = await this.checkOrchestrationName(
        this.form_26FormValue().input3,
      );
    }
    this.updateDisabled.set(false);
    setTimeout(() => {});
    if (isNameTaken === true) {
      this.form26?.form.controls['input3'].setErrors({
        error: 'Orchestartion Name already taken',
      });
      this.updateDisabled.set(true);
    } else if (isNameTaken === false) {
      if (this.recievedData.orchestrationId) {
        this.updateOrchestration();
      } else {
        this.closePopupWithData();
      }
    }
  }
  closePopupWithData() {
    const dataToSend = {
      orchestration_name: this.form_26FormValue().input3,
      templateId: this.form_26FormValue().select1,
      noOfInstance: this.form_26FormValue().noOfInstance,
      templateList: this.select1Properties.options,
      process_code: this.form_26FormValue().process_code,
      product_code: this.form_26FormValue().product_code,
    }; // Replace with actual data

    this.dialogRef.close(dataToSend);
  }
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
        this.commonToastService.showErrorToast('Unable to fetch data');
        return;
      }
    } catch (error: any) {
      this.commonToastService.showErrorToast(error.toString());
      return;
    }
  }

  updateOrchestration() {
    this.updateDisabled.set(true);

    var body: any = cloneDeep(this.recievedData.orchestrationDetails);
    body.orchestrationTemplatesId =
      this.form_26FormValue().select1;
    body.orchestrationsName = this.form_26FormValue().input3;
    body.productCode = this.form_26FormValue().product_code;
    body.processCode = this.form_26FormValue().process_code;
    body.dmlBy= GlobalVariables.dmlBy;
    if (this.form_26FormValue().noOfInstance) {
      body.noOfInstances = this.form_26FormValue().noOfInstance;
    }
    if (this.recievedData.orchestrationId) {
      body.orchestrationsId = this.recievedData.orchestrationId;
    }
    this.apiClient
      .saveDataApi(
        ApiVariables.orchestrations_url,
        body,
        this.recievedData?.orchestrationId ?? null,
      )
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            console.log(data.detail);

            this.commonToastService.showSuccessToast(
              `Orchestration name ${this.form_26FormValue().input3} has been updated successfully.`,
            );

            this.updateDisabled.set(false);
            this.closePopupWithData();
          } else {
            this.updateDisabled.set(false);
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys[0]?.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.updateDisabled.set(false);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }
}
