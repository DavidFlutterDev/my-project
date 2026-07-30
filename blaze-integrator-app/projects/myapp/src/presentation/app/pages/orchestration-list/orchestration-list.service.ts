import { Router } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';
import {
  ClCardProperties,
  ClTableConfigProperties,
  ClColumnType,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClIconProperties,
  ClLabelProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
} from '@clay/ui-components/basic';
import { HyperlinkComponent } from '../../templates/hyperlink/hyperlink.component';
import { GlobalVariables } from '../../utils/global.variables';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { ApiVariables } from '../../utils/api.variables';
import { CommonToastService } from '../common-services/common-toast.services';
import { dateFilterKeys, DOMHelper } from '../../utils/DOM-helper';
import { RoutingVariables } from '../../utils/routing.variables';
import { CommonDateService } from '../common-services/common-date-services';

@Injectable()
export class OrchestrationlistService {
  constructor(
    public router: Router,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
    private commonDateService: CommonDateService,
  ) {}

  public tempDataGridData: any[] = [];
  pageNo = 0;
  pageSize = 5;
  searchVal = '';
  fileteredFromDate = '';

  public navigateToNextPage() {
    this.router.navigate(['dashboard/add-gl-adjustment']);
  }

  public card2Properties: ClCardProperties = {
    id: `card2`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `py-20`,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public icon0Properties: ClIconProperties = {
    id: `icon0`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4 icon-size-8`,
    },
    iconName: `fss_icons:no-data-sparkle`,
  };
  public noDataTextProperties: ClLabelProperties = {
    id: `noDataText`,
    label: `There are no files configured yet.`,
    type: ClComponentTypes.label,
    style: {
      cssClasses: `text-base text-neutral-700 items-center`,
      contentWidth: `w-full`,
    },
    showTooltip: false,
  };
  private addNewDisabled = signal<boolean>(false);
  public addNewProperties: ClButtonProperties = {
    id: `Add new`,
    label: `Add new`,
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: `mat-primary`,
    },
    icon: `heroicons_outline:plus-circle`,
    onSubmit: this.onClickAdd.bind(this),
    disabled: this.addNewDisabled,
  };
  public listCardProperties: ClCardProperties = {
    id: `listCard`,
    type: ClComponentTypes.card,
    style: {
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public dataGrid8Properties: ClTableConfigProperties = {
    pageSize: GlobalVariables.dataGridpageSize,
    id: `dataGrid8`,
    editField: false,
    showFilter: true,
    isMultiple: true,
    customButtons: [
      {
        label: `Add`,
        id: `button11`,
        type: ClComponentTypes.button,
        buttonType: IClButtonType.button,
        buttonBehavior: ClButtonBehavior.flat,
        style: {
          cssClasses: 'outline outline-primary-500 outline-1 m-1',
          iconCssClasses: `fill-blue-800`,
          labelCssClasses: `text-blue-800`,
        },

        icon: `heroicons_outline:plus-circle`,
        onSubmit: this.onClickAdd.bind(this),
      },
    ],
    showLoading: false,
    showPaginator: true,
    showColumnFilter: false,
    type: ClComponentTypes.dataGrid,
    pageSizeOptions: GlobalVariables.dataGridPageSizeOptions,
    style: {},
    columns: [
      {
        key: `orchestrationsName`,
        name: `Orchestration name`,
        columnType: ClColumnType.primary,
        disableDrag: false,
        visible: true,
        enableSearchOnColumn: true,
        component: HyperlinkComponent,
        componentProperty: {}
      },
      {
        key: `orchestrationTemplate`,
        name: `Orchestration template`,
        columnType: ClColumnType.text,
        disableDrag: false,
        visible: true,
        enableSearchOnColumn: false,
      },
      {
        key: `dmlOn`,
        name: `Created on`,
        columnType: ClColumnType.date,
        disableDrag: false,
        visible: true,
        enableSearchOnColumn: false,
      },

    ],
    data: [],
    totalRecords: 0,
    selectAllRecords: true,
    searchPlaceholder: `Search orchestration name`,
    showFilterDropdown: true,
    isCustomDataFilter: true,
    customDataFilter: null,
    onSearchBtnSubmit: this.onClickSearch.bind(this),
    filterConfig: DOMHelper.getDateFilterConfig(),
    onFilterChange: this.onDateFilter.bind(this),
    enableServerSidePagination: true,
    onPageNoChanged: this.onPageNoChanged.bind(this),
  };

  public getOrchestrationList() {
    var param = `page=${this.pageNo}&size=${this.pageSize}`;

    if (this.searchVal) {
      param = param + `&orchestrationName=${this.searchVal}`;
    }
    if (this.fileteredFromDate) {
      param = param + `&fromDate=${this.fileteredFromDate}`;
    }
    this.dataGrid8Properties.showLoading = true;

    this.apiClient
      .getListapi(ApiVariables.orchestrations_url, param)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.setOrchestrationData(data);
            this.dataGrid8Properties.showLoading = false;
          } else {
            this.dataGrid8Properties.showLoading = false;
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          this.dataGrid8Properties.showLoading = false;
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  public setOrchestrationData(data: any) {
    // this.dataGrid8Properties.pageSize = data.detail.pageSize;
    this.dataGrid8Properties.totalRecords = data.detail.totalElements;
    this.tempDataGridData = [];

    for (let i = 0; i < data.detail.content.length; i++) {
      let formattedDate = this.commonDateService.formateDate(data.detail.content[i].dmlOn);
      let obj = {
        orchestrationsId: data.detail.content[i].orchestrationsId,
        orchestrationsName: data.detail.content[i].orchestrationsName,
        orchestrationTemplatesId:
          data.detail.content[i].orchestrationTemplateDetail
            .orchestrationTemplatesId,
        orchestrationTemplate:
          data.detail.content[i].orchestrationTemplateDetail
            .orchestrationTemplateName,
        dmlOn: formattedDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }

    this.dataGrid8Properties.data = this.tempDataGridData;
  }

  public onPageNoChanged(
    pageNo: any,
    pageSize: any,
    sortColumn: any,
    sortOrder: any,
  ) {
    this.pageNo = pageNo - 1;
    this.pageSize = pageSize;

    this.getOrchestrationList();
  }

  public onClickAdd() {
    this.router.navigate([RoutingVariables.addOrchestrationRoute]);
  }

  public onClickDetails(row: any) {
    console.log('row: ', row);
    this.router.navigate([RoutingVariables.orchestrationHistoryRoute], {
      state: row,
    });
  }

  public onClickSearch(value: any) {
    this.pageNo = 0;
    this.searchVal = value;
    this.getOrchestrationList();
  }

  public onDateFilter(value: any) {
    console.log('288', value);
    const today = new Date();

    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    switch (value.dmlOn) {
      case dateFilterKeys.all:
        this.fileteredFromDate = '';
        if (value.globalSearch == '') {
          this.pageNo = 0;
          this.searchVal = '';
        }
        break;
      case dateFilterKeys.today:
        this.fileteredFromDate = formatDate(today);
        break;
      case dateFilterKeys.yesterday:
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        this.fileteredFromDate = formatDate(yesterday);
        break;
      case dateFilterKeys.last7Days:
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        this.fileteredFromDate = formatDate(last7Days);
        break;

      case dateFilterKeys.last30Days:
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        this.fileteredFromDate = formatDate(last30Days);
        break;

      default:
        this.fileteredFromDate = '';
        break;
    }

    this.getOrchestrationList();
  }
}
