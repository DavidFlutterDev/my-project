import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ClCardProperties,
  ClTableConfigProperties,
  ClColumnType,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { ClIconProperties, ClLabelProperties } from '@clay/ui-components/basic';
import { DatePipe } from '@angular/common';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiVariables } from '../../utils/api.variables';
import { GlobalVariables } from '../../utils/global.variables';
import { DOMHelper } from '../../utils/DOM-helper';

@Injectable()
export class PipelinerunsService {
  constructor(
    public router: Router,
    private datePipe: DatePipe,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) {}

  public tempDataGridData: any[] = [];
  isDataAvailable: boolean = true;

  private http: HttpClient = inject(HttpClient);

  public noDataCardProperties: ClCardProperties = {
    id: `noDataCard`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `items-center py-20`,
      alignContent: ``,
      justifyContent: ``,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public icon0Properties: ClIconProperties = {
    id: `icon0`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-16`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `fss_icons:no-data-sparkle`,
  };
  public label1Properties: ClLabelProperties = {
    id: `label1`,
    label: `There are no pipeline runs are available`,
    type: ClComponentTypes.label,
    style: {
      cssClasses: `text-base text-neutral-700`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
    },
    showTooltip: false,
  };
  public card1Properties: ClCardProperties = {
    id: `card1`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: ``,
      alignContent: ``,
      justifyContent: ``,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public datagridProperties: ClTableConfigProperties = {
    pageSize: GlobalVariables.dataGridpageSize,
    id: `datagrid`,
    editField: false,
    showFilter: true,
    isMultiple: true,
    customButtons: [],
    showLoading: false,
    showPaginator: true,
    columnCustomization: false,
    type: ClComponentTypes.dataGrid,
    pageSizeOptions:  GlobalVariables.dataGridPageSizeOptions,
    style: {},
    columns: [
      {
        key: 'pipelineRunsId',
        name: `Pipeline runs id`,
        columnType: ClColumnType.number,
        disableDrag: false,
        visible: true,
      },
      {
        key: `pipelinesId`,
        name: `Pipeline id`,
        columnType: ClColumnType.number,
        disableDrag: false,
        visible: true,
      },
      {
        key: `triggerStatus`,
        name: `trigger status`,
        columnType: ClColumnType.text,
        disableDrag: false,
        visible: true,
      },
      {
        key: `triggerStatusUpdatedOn`,
        name: `Trigger status updated on`,
        columnType: ClColumnType.date,
        disableDrag: false,
        visible: true,
      },
      {
        key: `executionStatus`,
        name: `Execution status`,
        columnType: ClColumnType.text,
        disableDrag: false,
        visible: true,
      },
      {
        key: `executionStatusUpdatedOn`,
        name: `Execution status updated on`,
        icon: ``,
        pinned: false,
        visible: true,
        canSort: false,
        currency: ``,
        columnType: ClColumnType.date,
        imageLabelKey: ``,
        columnStyle: {},
        showIndicator: false,
        textTrimLength: 0,
        hideFromCustomization: false,
        actionIcons: [],
        options: [],
        // icons: {},
        // validation: {},
        // imageProperties: {},
        // inputProperties: {},
        // actionIconDropdownProperties: {},
        editing: false,
        multipleSelect: false,
        properties: {},
        hasEditableRights: false,
        disableDrag: false,
        componentProperty: {},
        displayAlways: false,
      },
      {
        key: `dmlOn`,
        name: `Created on`,
        icon: ``,
        pinned: false,
        visible: true,
        canSort: false,
        currency: ``,
        columnType: ClColumnType.date,
        imageLabelKey: ``,
        columnStyle: {},
        showIndicator: false,
        textTrimLength: 0,
        options: [],
        hideFromCustomization: false,
        actionIcons: [],
        // icons: {},
        // validation: {},
        // imageProperties: {},
        // inputProperties: {},
        // actionIconDropdownProperties: {},
        editing: false,
        multipleSelect: false,
        properties: {},
        hasEditableRights: false,
        disableDrag: false,
        componentProperty: {},
        displayAlways: false,
      },
    ],
    data: [
      // {
      //   dmlOn: '08, Oct 2024, 19:49',
      //   executionStatus: 'Success',
      //   executionStatusUpdatedOn: '08, Oct 2024, 19:49',
      //   pipelineRunsId: 1,
      //   pipelinesId: 1,
      //   triggerStatus: 'Success',
      //   triggerStatusUpdatedOn: '08, Oct 2024, 19:49',
      // },
    ],
    selectAllRecords: true,
    searchPlaceholder: `Search `,
    // showFilterDropdown: true,
    // filterConfig: DOMHelper.getDateFilterConfig(),
    // onFilterChange: this.onDateFilter.bind(this),
  };


  public onDateFilter(value: any) {
    console.log('onDateFilter', value);
  }


  public setTemplateData(data: any) {
    console.log('dataaaa', data);

    this.datagridProperties.pageSize = data.detail.pageSize;
    this.datagridProperties.totalRecords = data.detail.totalElements;
    this.tempDataGridData = [];

    for (let i = 0; i < data.detail.content.length; i++) {
      let dmlOnDate;
      let triggerDate;
      let executionDate;
      if (data.detail.content[i].dmlOn) {
        dmlOnDate = this.datePipe.transform(
          data.detail.content[i].dmlOn,
          'dd, MMM yyyy, HH:mm',
        );
      }
      if (data.detail.content[i].triggerStatusUpdatedOn) {
        triggerDate = this.datePipe.transform(
          data.detail.content[i].triggerStatusUpdatedOn,
          'dd, MMM yyyy, HH:mm',
        );
      }
      if (data.detail.content[i].executionStatusUpdatedOn) {
        executionDate = this.datePipe.transform(
          data.detail.content[i].executionStatusUpdatedOn,
          'dd, MMM yyyy, HH:mm',
        );
      }
      let obj = {
        pipelineRunsId: data.detail.content[i].pipelineRunsId,
        pipelinesId: data.detail.content[i].pipelinesId,
        triggerStatus: data.detail.content[i].triggerStatus,
        triggerStatusUpdatedOn: triggerDate ?? '--',
        executionStatus: data.detail.content[i].executionStatus,
        executionStatusUpdatedOn: executionDate ?? '--',

        dmlOn: dmlOnDate ?? '--',
      };
      this.tempDataGridData.push(obj);
    }
    console.log('tempData', this.tempDataGridData);
    this.datagridProperties.data = this.tempDataGridData;
  }
}
