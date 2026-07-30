import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  ClToastProperties,
} from '@clay/ui-components/basic';
import { Observable } from 'rxjs/internal/Observable';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { Router, RouterLinkWithHref } from '@angular/router';
import { GlobalVariables } from '../../utils/global.variables';
import { DOMHelper, dateFilterKeys } from '../../utils/DOM-helper';
import { SortDirection } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { RoutingVariables } from '../../utils/routing.variables';
import { ApiVariables } from '../../utils/api.variables';
import { CommonToastService } from '../common-services/common-toast.services';

@Injectable({
  providedIn: 'root',
})
export class PipelinetemplatelistService {
  constructor(
    private apiClient: ApiClient,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private commonToastService: CommonToastService
  ) {}
  private http: HttpClient = inject(HttpClient);
  public tempDataGridData: any[] = [];

  pageNo = 0;
  searchVal = '';
  fileteredFromDate = '';
  pageSize = 5;

  isTemplatesDataAvailable: boolean = true;
  breadcrumbData = [
    {
      label: 'Pipeline template generator',
      // routeUrl: RoutingVariables.orchestrationRoute
    }
  ];
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
  public noDataLabelProperties: ClLabelProperties = {
    id: 'noDataLabel',
    label: 'There are no pipeline templates created yet.',
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
  public dataGrid0Properties: ClTableConfigProperties = {
    id: 'dataGrid1',
    editField: false,
    showFilter: true,
    isMultiple: true,
    customButtons: [
      {
        label: 'Add ',
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
    columns: [
      {
        key: 'name',
        name: 'Pipeline name',
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
            id: 'deleteIcon',
            type: ClComponentTypes.icon,
            iconName: 'heroicons_outline:trash',
            style: { cssClasses: 'text-red-600 cursor-pointer' },
            onIconClicked: this.openDeleteConfirmationDialog.bind(this),
          },
        ],
      },
    ],
    data: [
      // {
      //   name: 'kafka',
      //   dmlOn: '03, Sep 2024, 10:30',
      // },
    ],
    selectAllRecords: true,
    pageSize: GlobalVariables.dataGridpageSize,
    searchPlaceholder: 'Search pipeline template name',
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
    this.pageSize = pageSize;

    this.getTemplateList();
  }

  public onClickAdd() {
    this.router.navigate([RoutingVariables.addPipelineTemplateRoute]);
  }

  public editAction(row: any) {
    this.router.navigate([RoutingVariables.editPipelineTemplateRoute], {
      state: { id: row.templatesId },
    });
  }


  public onClickSearch(value: any) {
    console.log('onSearchTap', value);

    this.pageNo = 0;
    this.searchVal = value;
    this.getTemplateList();
  }


  public onDateFilter(value: any) {
    console.log('data', value);
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
          this.getTemplateList();
        }
        break;
      case 'Today':
        this.fileteredFromDate = formatDate(today);
        break;
      case 'Yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        this.fileteredFromDate = formatDate(yesterday);
        break;
      case 'Last 7 Days':
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        this.fileteredFromDate = formatDate(last7Days);
        break;

      case 'Last 30 Days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        this.fileteredFromDate = formatDate(last30Days);
        break;

      default:
        this.fileteredFromDate = '';
        break;
    }
  }

  public getTemplateList() {
    var param = `page=${this.pageNo}&size=${this.pageSize}`;
    if (this.searchVal != null && this.searchVal != '') {
      param = param + `&templateName=${this.searchVal}`;
    }
    if (this.fileteredFromDate != null && this.fileteredFromDate != '') {
      param = param + `&fromDate=${this.fileteredFromDate}`;
    }
    this.dataGrid0Properties.showLoading = true;
    this.apiClient.getListapi(ApiVariables.template_url, param).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.setTemplateData(data);
          this.dataGrid0Properties.showLoading = false;
        } else {
          this.dataGrid0Properties.showLoading = false;
          this.isTemplatesDataAvailable = false;
          this.commonToastService.showErrorToast('Unable to fetch data');
        }
      },
      error: (err: any) => {
        this.dataGrid0Properties.showLoading = false;
        this.isTemplatesDataAvailable = false;
        console.log(err);
        this.commonToastService.showErrorToast(err.toString());
      },
    });
  }

  public setTemplateData(data: any) {
    console.log('dataaaa', data);

    this.dataGrid0Properties.pageSize = data.detail.pageSize;
    this.dataGrid0Properties.totalRecords = data.detail.totalElements;
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
        templatesId: data.detail.content[i].templatesId,
        name: data.detail.content[i].templateName,
        dmlOn: formattedDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }
    this.dataGrid0Properties.data = this.tempDataGridData;
  }


  openDeleteConfirmationDialog(row: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `pipeline tmeplate \"${row.name}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('Item deleted:', row);
        this.deleteAction(row);
      } else {
        // Canceled
        console.log('Delete operation cancelled');
      }
    });
  }

  public deleteAction(row: any) {
    console.log('row tempalteId', row.templatesId);
    this.apiClient.deleteDataApi(ApiVariables.template_url ,row.templatesId).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.commonToastService.showInfoToast(
            `Pipeline template ${row.name} is deleted.`,
          );
          this.getTemplateList();
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

}
