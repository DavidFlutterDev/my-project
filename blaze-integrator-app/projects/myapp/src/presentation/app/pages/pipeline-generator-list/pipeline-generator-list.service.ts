import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ClCardProperties,
  ClTableConfigProperties,
  ClColumnType,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import {
  ClLabelProperties,
  ClButtonProperties,
  IClButtonType,
  ClButtonBehavior,
  ClIconProperties,
  ClToastService,
} from '@clay/ui-components/basic';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { GlobalVariables } from '../../utils/global.variables';
import { RoutingVariables } from '../../utils/routing.variables';
import { Router } from '@angular/router';
import { DOMHelper, dateFilterKeys } from '../../utils/DOM-helper';
import { ApiVariables } from '../../utils/api.variables';

@Injectable({
  providedIn: 'root',
})
export class PipelinegeneratorlistService {
  constructor(
    private apiClient: ApiClient,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private toastService: ClToastService,
  ) {}
  private http: HttpClient = inject(HttpClient);
  public tempDataGridData: any[] = [];

  pageNo = 0;
  searchVal = '';
  fileteredDate = '';
  pageSize = 5;
  isPipelinesDataAvailable: boolean = true;

  public noDataCardProperties: ClCardProperties = {
    id: 'noDataCard',
    type: ClComponentTypes.card,
    style: {
      cssClasses: 'py-20 flex flex-col items-center justify-center bottom-4',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: 'items-center',
      labelCssClasses: 'text-2xl md:text-3xl font-medium  ',
    },
    cardTitle: '',
  };
  public noDataIconProperties: ClIconProperties = {
    id: 'noDataIcon',
    type: ClComponentTypes.icon,
    style: {
      cssClasses: 'icon-size-16',
      contentWidth: '',
      alignContent: '',
      justifyContent: '',
    },
    iconName: 'fss_icons:no-data-sparkle',
  };
  public NoDataLabelProperties: ClLabelProperties = {
    id: 'NoDataLabel',
    label: 'There are no pipeline created yet.',
    type: ClComponentTypes.label,
    style: {
      cssClasses:
        'text-neutral-600 text-base font-semibold flex-col flex items-center justify-center text-center py-1',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: 'items-center',
    },
    showTooltip: false,
  };
  private addButtonDisabled = signal<boolean>(false);
  public addButtonProperties: ClButtonProperties = {
    id: 'addButton',
    label: 'Add new',
    showFailed: false,
    showLoading: false,
    showSuccess: false,
    type: ClComponentTypes.button,
    buttonType: IClButtonType.button,
    buttonBehavior: ClButtonBehavior.flat,
    style: {
      cssClasses: 'mat-primary justify-center',
      contentWidth: '',
      justifyContent: 'justify-center',
      alignContent: 'items-center',
    },
    icon: 'heroicons_outline:plus-circle',
    onSubmit: this.onClickAdd.bind(this),
    disabled: this.addButtonDisabled,
  };
  public dataCardProperties: ClCardProperties = {
    id: 'dataCard',
    type: ClComponentTypes.card,
    style: {
      cssClasses: '',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: '',
      labelCssClasses: 'text-2xl md:text-3xl font-medium  ',
    },
  };
  public dataGrid1Properties: ClTableConfigProperties = {
    id: 'dataGrid1',
    editField: false,
    showFilter: true,
    isMultiple: true,
    customButtons: [
      {
        label: 'Add',
        id: 'addButton',
        type: ClComponentTypes.button,
        buttonType: IClButtonType.button,
        buttonBehavior: ClButtonBehavior.flat,
        style: {
          cssClasses: 'outline outline-primary-500 outline-1 m-1',
          iconCssClasses: 'fill-blue-800',
          labelCssClasses: 'text-blue-800',
        },
        icon: 'heroicons_outline:plus-circle',
        onSubmit: this.onClickAdd.bind(this),
      },
    ],
    showLoading: false,
    showPaginator: true,
    type: ClComponentTypes.dataGrid,
    pageSizeOptions: GlobalVariables.dataGridPageSizeOptions,
    style: {},
    onPrimaryColumnClick: () => {},
    columns: [
      {
        key: 'pipelineName',
        name: 'Pipeline name',
        columnType: ClColumnType.primary,
        disableDrag: false,
        visible: true,
      },
      {
        key: 'templateName',
        name: 'Template name',
        columnType: ClColumnType.text,
        disableDrag: false,
        visible: true,
      },
      {
        key: 'dmlOn',
        name: 'Created on',
        columnType: ClColumnType.date,
        disableDrag: false,
        visible: true,
      },
      {
        key: 'status',
        name: 'Actions',
        columnType: ClColumnType.actions,
        disableDrag: false,
        visible: true,
        actionIcons: [
          {
            id: 'editIcon',
            type: ClComponentTypes.icon,
            iconName: 'heroicons_solid:pencil',
            style: { cssClasses: 'text-primary-600 cursor-pointer' },
            onIconClicked: this.editAction.bind(this),
          },
          {
            id: 'runIcon',
            type: ClComponentTypes.icon,
            iconName: 'heroicons_solid:play',
            style: { cssClasses: 'text-primary-600 cursor-pointer' },
            onIconClicked: this.playAction.bind(this),
          },
        ],
      },
    ],
    data: [
      // {
      //   pipelineName: 'dummyName',
      //   templateName: 'dummy template',
      //   dmlOn: '03, Sep 2024, 10:30',
      // },
    ],
    selectAllRecords: true,
    pageSize: GlobalVariables.dataGridpageSize,
    searchPlaceholder: 'Search pipeline name',
    showFilterDropdown: true,

    onSearchBtnSubmit: this.onClickSearch.bind(this),
    filterConfig: DOMHelper.getDateFilterConfig(),
    onFilterChange: this.onDateFilter.bind(this),
    enableServerSidePagination: true,
    totalRecords: 0,
    onPageNoChanged: this.onPageNoChanged.bind(this),
  };

  public onPageNoChanged(
    pageNo: any,
    pageSize: any,
    sortColumn: any,
    sortOrder: any,
  ) {
    this.pageNo = pageNo - 1;
    // console.log("pagesize", pageSize);
    // console.log("datagrid pagesize", this.dataGrid0Properties.pageSize);
    this.pageSize = pageSize;

    this.getpipelineList();
  }

  public onClickAdd() {
    this.router.navigate([RoutingVariables.addPipelineGeneratorRoute]);
  }

  public editAction(row: any) {
    this.router.navigate([RoutingVariables.addPipelineGeneratorRoute], {
      state: { id: row.pipelinesId },
    });
  }
  public playAction(row: any) {
    this.router.navigate([RoutingVariables.pipelineRunsRoute], {
      state: { id: row.pipelinesId },
    });
  }

  public onClickSearch(value: any) {
    console.log('onSearchTap', value);

    this.pageNo = 0;
    this.searchVal = value;
    this.getpipelineList();
  }

  public onDateFilter(value: any) {
    console.log('data', value);
    const today = new Date();

    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    switch (value.dmlOn) {
      case dateFilterKeys.all:
        this.fileteredDate = '';
        if (value.globalSearch == '') {
          this.pageNo = 0;
          this.searchVal = '';
          this.getpipelineList();
        }
        break;
      case 'Today':
        this.fileteredDate = formatDate(today);
        break;
      case 'Yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        this.fileteredDate = formatDate(yesterday);
        break;
      case 'Last 7 Days':
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        this.fileteredDate = formatDate(last7Days);
        break;

      case 'Last 30 Days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        this.fileteredDate = formatDate(last30Days);
        break;

      default:
        this.fileteredDate = '';
        break;
    }
  }

  public getpipelineList() {
    var param = `page=${this.pageNo}&size=${this.pageSize}`;
    if (this.searchVal != null && this.searchVal != '') {
      param = param + `&pipelineName=${this.searchVal}`;
    }
    if (this.fileteredDate != null && this.fileteredDate != '') {
      param = param + `&fromDate=${this.fileteredDate}`;
    }
    this.dataGrid1Properties.showLoading = true;
    this.apiClient.getListapi(ApiVariables.pipeline_url, param).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.setPipelineData(data);
          this.dataGrid1Properties.showLoading = false;
        } else {
          this.dataGrid1Properties.showLoading = false;
          this.isPipelinesDataAvailable = false;
          this.showErrorToast('Unable to fetch data');
        }
      },
      error: (err: any) => {
        this.dataGrid1Properties.showLoading = false;
        this.isPipelinesDataAvailable = false;
        console.log(err);
        this.showErrorToast(err.toString());
      },
    });
  }

  public setPipelineData(data: any) {
    console.log('dataaaa', data);

    this.dataGrid1Properties.pageSize = data.detail.pageSize;
    this.dataGrid1Properties.totalRecords = data.detail.totalElements;
    this.tempDataGridData = [];

    for (let i = 0; i < data.detail.content.length; i++) {
      let formattedDate;
      if (
        data.detail.content[i].dmlOn != null &&
        data.detail.content[i].dmlOn != ''
      ) {
        formattedDate = this.datePipe.transform(
          data.detail.content[i].dmlOn,
          'dd, MMM yyyy, HH:mm',
        );
      }
      let obj = {
        pipelinesId: data.detail.content[i].pipelinesId,
        pipelineName: data.detail.content[i].pipelineName ?? '--',
        templatesId: data.detail.content[i].templatesId,
        templateName: data.detail.content[i].templateName ?? '--',
        dmlOn: formattedDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }
    this.dataGrid1Properties.data = this.tempDataGridData;
  }

  showErrorToast(err: string) {
    this.toastService.error({
      id: '',
      type: ClComponentTypes.default,
      message: err,
    });
  }
}
