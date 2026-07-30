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
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { RoutingVariables } from '../../utils/routing.variables';
import { GlobalVariables } from '../../utils/global.variables';
import { DOMHelper, dateFilterKeys } from '../../utils/DOM-helper';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ApiVariables } from '../../utils/api.variables';
import { CommonToastService } from '../common-services/common-toast.services';

@Injectable({
  providedIn: 'root',
})
export class JsonschemalistService {
  constructor(
    private apiClient: ApiClient,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private toastService: ClToastService,
    private commonToastService: CommonToastService,

  ) {}
  private http: HttpClient = inject(HttpClient);
  public tempDataGridData: any[] = [];
  pageNo = 0;
  searchVal = '';
  fileteredFromDate = '';
  pageSize = 5;

  isSchemasDataAvailable: boolean = true;
  breadcrumbData = [
    {
      label: 'Json schema generator',
    }
  ];

  public pagenavigation() {}

  public noDataCardProperties: ClCardProperties = {
    id: 'noDataCard',
    type: ClComponentTypes.card,
    style: {
      cssClasses: 'py-20 bottom-4',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: 'items-center',
      labelCssClasses: 'text-2xl md:text-3xl font-medium  ',
    },
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
    label: 'There are no Json schema generated yet.',
    type: ClComponentTypes.label,
    style: {
      cssClasses:
        'text-base text-neutral-600 font-semibold justify-center content-center items-center py-1',
      contentWidth: 'w-full',
      justifyContent: '',
      alignContent: 'items-center',
    },
    showTooltip: false,
  };
  private AddButtonDisabled = signal<boolean>(false);
  public AddButtonProperties: ClButtonProperties = {
    id: 'AddButton',
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
    disabled: this.AddButtonDisabled,
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
  public dataGridProperties: ClTableConfigProperties = {
    id: 'dataGrid',
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
    columns: [
      {
        key: 'JsonSchemaName',
        name: 'Json schema name',
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
      //   JsonSchemaName: 'schema5',
      //   dmlOn: '03, Sep 2024, 10:30',
      // },
    ],
    selectAllRecords: true,
    pageSize: GlobalVariables.dataGridpageSize,
    searchPlaceholder: 'Search json schema name',
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

    this.getValidationSchemasList();
  }

  public onClickAdd() {
    this.router.navigate([RoutingVariables.addJsonSchemaRoute]);
  }

  public editAction(row: any) {
    console.log("row data:", row);
    this.router.navigate([RoutingVariables.editJsonSchemaRoute], {
      state: { id: row.schemasId },
    });
  }

  public onClickSearch(value: any) {
    console.log('onSearchTap', value);

    this.pageNo = 0;
    this.searchVal = value;
    this.getValidationSchemasList();
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
          this.getValidationSchemasList();
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

  public getValidationSchemasList() {
    console.log('fileteredDate', this.fileteredFromDate);
    var param = `page=${this.pageNo}&size=${this.pageSize}`;
    if (this.searchVal != null && this.searchVal != '') {
      param = param + `&schemaName=${this.searchVal}`;
    }
    if (this.fileteredFromDate != null && this.fileteredFromDate != '') {
      param = param + `&fromDate=${this.fileteredFromDate}`;
    }
    this.dataGridProperties.showLoading = true;
    this.apiClient
      .getListapi(ApiVariables.validation_schema_url, param)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.setValidationSchemasData(data);
            this.dataGridProperties.showLoading = false;
          } else {
            this.dataGridProperties.showLoading = false;
            this.isSchemasDataAvailable = false;
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          this.dataGridProperties.showLoading = false;
          this.isSchemasDataAvailable = false;
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  public setValidationSchemasData(data: any) {
    console.log('dataaaa', data);

    this.dataGridProperties.pageSize = data.detail.pageSize;
    this.dataGridProperties.totalRecords = data.detail.totalElements;
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
        schemasId: data.detail.content[i].validationSchemasId,
        JsonSchemaName: data.detail.content[i].schemaName,
        dmlOn: formattedDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }
    this.dataGridProperties.data = this.tempDataGridData;
  }

  openDeleteConfirmationDialog(row: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `Json schema \"${row.JsonSchemaName}\"` }, // Pass any data needed
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
    console.log('row schemasId', row.schemasId);
    this.apiClient
      .deleteDataApi(ApiVariables.validation_schema_url, row.schemasId)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.commonToastService.showInfoToast(`Json schema ${row.JsonSchemaName} is deleted.`);
            this.getValidationSchemasList();
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

  // showErrorToast(err: string) {
  //   this.toastService.error({
  //     id: '',
  //     type: ClComponentTypes.default,
  //     message: err,
  //   });
  // }
  // showSuccessToast(err: string) {
  //   this.toastService.success({
  //     id: '',
  //     type: ClComponentTypes.default,
  //     message: err,
  //   });
  // }
  // showInfoToast(err: string) {
  //   this.toastService.info({
  //     id: '',
  //     type: ClComponentTypes.default,
  //     message: err,
  //   });
  // }
}
