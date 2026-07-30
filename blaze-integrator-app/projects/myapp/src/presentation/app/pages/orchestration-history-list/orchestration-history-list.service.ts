import { Router } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';
import {
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
  ClLabelProperties,
} from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClCardProperties,
  ClTableConfigProperties,
  ClColumnType,
} from '@clay/ui-components/containers';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiVariables } from '../../utils/api.variables';
import { RoutingVariables } from '../../utils/routing.variables';
import { CommonDateService } from '../common-services/common-date-services';
import { GlobalVariables } from '../../utils/global.variables';
import { OrchestrationrundetailsComponent } from '../orchestration-run-details/orchestration-run-details.component';

@Injectable()
export class OrchestrationhistorylistService {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
    private commonDateService: CommonDateService,
  ) {}

  breadcrumbData = [
    {
      label: 'Orchestration',
      routeUrl: RoutingVariables.orchestrationRoute
    },
    {
      label: 'details',
    },
  ];

  private editBtDisabled = signal<boolean>(false);
  public orchestrationData: any;
  pageSize = 5;
  pageNo = 0;


  public editBtProperties: ClButtonProperties = {
    id: `editBt`,
    label: `Edit`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary bg-transparent text-blue-500 border-blue-700 border-2 outline outline-1 outline-primary-500 h-5 w-28`,
    },
    disabled: this.editBtDisabled,
    onSubmit: this.onClickEdit.bind(this),
  };
  private deleteButtonDisabled = signal<boolean>(false);
  public deleteButtonProperties: ClButtonProperties = {
    id: `button3`,
    label: `Delete`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary bg-transparent text-red-500 outline outline-1 outline-red-500 h-5 w-28`,
    },
    disabled: this.deleteButtonDisabled,
    onSubmit: this.openDeleteConfirmationDialog.bind(this),
  };

  // class="mdc-button mdc-button--unelevated mat-mdc-unelevated-button gap-2 m-1 outline outline-1 outline-primary-500 mat-unthemed mat-mdc-button-base ng-star-inserted"
  public card0Properties: ClCardProperties = {
    id: `card0`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `bottom-2`,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public OrchestrationNameLabelProperties: ClLabelProperties = {
    id: `OrchestrationNameLabel`,
    label: `Orchestration name: `,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base text-primary-800 text-sm font-normal`,
    },
  };
  public OrchestrationNameValueLabelProperties: ClLabelProperties = {
    id: `OrchestrationNameValueLabel`,
    label: ``,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base text-primary-800 font-semibold text-lg`,
    },
  };
  public OrchestrationTemplateLabelProperties: ClLabelProperties = {
    id: `OrchestrationTemplateLabel`,
    label: `Orchestration template: `,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base text-primary-800 text-sm font-normal`,
    },
  };
  public orchestrationTemplateValueLabelProperties: ClLabelProperties = {
    id: `prchestrationTemplateValueLabel`,
    label: ``,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base font-medium text-neutral-900`,
    },
  };
  public CreatedOnProperties: ClLabelProperties = {
    id: `CreatedOn:`,
    label: `Created on: `,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base text-primary-800 text-sm font-normal`,
    },
  };
  public createdOnLabelProperties: ClLabelProperties = {
    id: `createdOnLabel`,
    label: ``,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base font-medium text-neutral-900`,
    },
  };
  public card1Properties: ClCardProperties = {
    id: `card1`,
    type: ClComponentTypes.card,
    style: {
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public label6Properties: ClLabelProperties = {
    id: `label6`,
    label: `Orchestration execution history`,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base text-primary-800 font-semibold text-lg mb-2`,
    },
  };
  public dataGrid1Properties: ClTableConfigProperties = {
    pageSize: GlobalVariables.dataGridpageSize,
    id: `dataGrid1`,
    editField: false,
    showFilter: false,
    isMultiple: true,
    customButtons: [],
    showLoading: false,
    showPaginator: true,
    showColumnFilter: false,
    columnCustomization: false,
    type: ClComponentTypes.dataGrid,
    pageSizeOptions: GlobalVariables.dataGridPageSizeOptions,
    style: {
      cssClasses: `border-t-2`,
    },
    columns: [
      {
        key: `orchestrationRunsId`,
        name: `Orchestration runs id`,
        columnType: ClColumnType.text,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
      },

      {
        key: `triggerStatus`,
        name: `Trigger status`,
        columnType: ClColumnType.status,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
      },
      {
        key: `triggerStatusUpdatedOn`,
        name: `Trigger status updated on`,
        columnType: ClColumnType.date,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
      },
      {
        key: `executionStatus`,
        name: `Execution status`,
        columnType: ClColumnType.status,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
      },
      {
        key: `executionStatusUpdatedOn`,
        name: `Execution status updated on`,
        columnType: ClColumnType.date,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
      },
      {
        key: `actions`,
        name: `Actions`,
        columnType: ClColumnType.actions,
        disableDrag: false,
        enableSearchOnColumn: true,
        visible: true,
        actionIcons: [
          {
            id: 'runIcon',
            type: ClComponentTypes.icon,
            iconName: "heroicons_solid:arrows-pointing-out",
            style: { cssClasses: 'text-primary-600 cursor-pointer' },
            onIconClicked: this.onClickExpand.bind(this),
          },
        ],
      },
    ],
    data: [],
    selectAllRecords: true,
    showFilterDropdown: false,
    enableServerSidePagination: true,
    noDataLayout: {
      iconProperties: {
        id: `icon0`,
        type: ClComponentTypes.icon,
        style: {
          cssClasses: `icon-size-4 icon-size-8`,
        },
        iconName: `fss_icons:no-data-sparkle`,
      },
      labelProperties: {
        id: 'noDataLabel',
        type: ClComponentTypes.label,
        label: 'No history available',
        style: {
          cssClasses: `text-base text-neutral-700 items-center`,
          contentWidth: `w-full`,
        },
      },
    },
    onPageNoChanged: this.onPageNoChanged.bind(this),

  };


  public onPageNoChanged(
    pageNo: any,
    pageSize: any,
    sortColumn: any,
    sortOrder: any,
  ) {
    this.pageNo = pageNo - 1;
    this.pageSize = pageSize;

    this.getOrchestrationHistoryList();
  }

  public getOrchestrationHistoryList() {
    var param = `page=${this.pageNo}&size=${this.pageSize}`;

    this.dataGrid1Properties.showLoading = true;
    this.apiClient
      .getListapi(
        `${ApiVariables.orchestration_runs_url}/${this.orchestrationData.orchestrationsId}`,
        param,
      )
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.setOrchestrationHistoryData(data);

            this.dataGrid1Properties.showLoading = false;
            // this.isListDataAvailable.next(true);
          } else {
            this.dataGrid1Properties.showLoading = false;
            // this.isListDataAvailable.next(false);
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          this.dataGrid1Properties.showLoading = false;
          // this.isListDataAvailable.next(false);
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  tempDataGridData: any = [];
  public setOrchestrationHistoryData(data: any) {
    console.log('dataaaa', data);
    this.tempDataGridData = [];

    this.dataGrid1Properties.pageSize = data.detail.pageSize;
    this.dataGrid1Properties.totalRecords = data.detail.totalElements;
    for (let i = 0; i < data.detail.content.length; i++) {
      let dmlOnDate = this.commonDateService.formateDate(
        data.detail.content[i].dmlOn
      );
      let triggerDate = this.commonDateService.formateDate(
        data.detail.content[i].triggerStatusUpdatedOn
      );
      let executionDate = this.commonDateService.formateDate(
        data.detail.content[i].executionStatusUpdatedOn
      );

      let obj = {
        orchestrationRunsId: data.detail.content[i].orchestrationRunsId,
        triggerStatus: data.detail.content[i].triggerStatus,
        triggerStatusUpdatedOn: triggerDate??'--',
        executionStatus: data.detail.content[i].executionStatus,
        executionStatusUpdatedOn: executionDate ?? '--',
        dmlOn: dmlOnDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }
    this.dataGrid1Properties.data = this.tempDataGridData;
    console.log("dataGrid1Properties: ", this.dataGrid1Properties.data);
  }
  onClickEdit() {
    console.log('edit');
    this.router.navigate([RoutingVariables.editOrchestrationRoute], {
      state: { id: this.orchestrationData.orchestrationsId },
    });
  }

  openDeleteConfirmationDialog(): void {
    console.log('orchData: ', this.orchestrationData);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',

      data: {
        itemName: `Orchestration \"${this.orchestrationData.orchestrationsName}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('Item deleted:', this.orchestrationData.orchestrationsName);
        this.deleteAction();
      } else {
        // Canceled
        console.log('Delete operation cancelled');
      }
    });
  }

  deleteAction() {
    this.apiClient
      .deleteDataApi(
        ApiVariables.orchestrations_url,
        this.orchestrationData.orchestrationsId,
      )
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.commonToastService.showInfoToast(
              `orchestration ${this.orchestrationData.orchestrationsName} is deleted.`,
            );
            this.router.navigate([RoutingVariables.orchestrationRoute]);

            console.log('deletedd');
          } else {
            console.log('delete failed');
            this.commonToastService.showErrorToast('Failed to delete');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  onClickExpand(row:any){
    console.log("row: ", row);
    const dialogRef = this.dialog.open(OrchestrationrundetailsComponent, {
      width: '700px',
      // height: 'h-1/2',
      maxHeight:  window.innerHeight - 20,
      minHeight:  window.innerHeight - 20,
      position: { bottom: '0px', right: '0px' }, // Bottom-right corner
      panelClass: 'history-details-popup',
      data: {orchestrationRun: row}
    });

    // dialogRef.afterClosed().subscribe((result) => {});
  }
}
