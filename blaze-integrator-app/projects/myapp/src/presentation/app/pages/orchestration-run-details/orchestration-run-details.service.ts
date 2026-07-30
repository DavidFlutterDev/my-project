import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { ClLabelProperties, ClIconProperties } from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { ClCardProperties } from '@clay/ui-components/containers';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiVariables } from '../../utils/api.variables';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class OrchestrationrundetailsService {
  constructor(
    public router: Router,
    private apiClient: ApiClient,
    public dialog: MatDialog,
    private commonToastService: CommonToastService,
  ) {}
  public runsList = new BehaviorSubject<any>([]);

  public commonColumnClass ="flex w-full gap-4 flex-col";

  public staticTitleProperties: ClLabelProperties = {
    id: `staticTitle`,
    label: `Orchestration runs id`,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-neutral-100 font-normal text-sm`,
    },
  };
  public dynamicTitleProperties: ClLabelProperties = {
    id: `dynamicTitle`,
    label: ``,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `text-base font-medium text-neutral-100`,
    },
  };
  public closeIconProperties: ClIconProperties = {
    id: `closeIcon`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `close-icon icon-size-6`,

    },
    iconName: `fss_icons:close-icon`,
    onIconClicked:()=>{
      this.dialog.closeAll();
    }
  };
  public card0Properties: ClCardProperties = {
    id: `card0`,
    type: ClComponentTypes.card,
    style: {
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };


  public card1Properties: ClCardProperties = {
    id: `card1`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `mt-0`,
      contentWidth: `w-full`,
      labelCssClasses: `text-2xl md:text-3xl font-medium  `,
    },
  };
  public label6Properties: ClLabelProperties = {
    id: `label6`,
    label: `Pipeline execution history`,
    showTooltip: false,
    type: ClComponentTypes.label,
    style: {
      contentWidth: `w-full`,
      cssClasses: `font-semibold text-primary-800 text-lg mb-2`,
    },
  };


  titleLabelTileProperties(label:any){
    return {
      id: `label2`,
      label: label,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `font-normal text-sm text-neutral-800`,
      },
    }
  }

  valueLabelTileProperties(label:any){
    return {
      id: `label3`,
      label: label,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `font-normal text-base text-neutral-900`,
      },
    }
  }

  subHeadingProperties(label:any){
    return {
      id: `label7`,
      label:  label,
      showTooltip: false,
      type: ClComponentTypes.label,
      style: {
        contentWidth: `w-full`,
        cssClasses: `text-base font-bold text-neutral-800 pt-4 pb-2`,
      },
    };
  }

  orchestrationRun: any;
  setOrchestrationRunDetails(orchestrationRun:any){
    this.orchestrationRun = orchestrationRun;
    this.dynamicTitleProperties.label = orchestrationRun.orchestrationRunsId;
  }

  getHistoryDetails() {
    this.apiClient
      .getDetailsApi(`${ApiVariables.orchestration_runs_details_url}`, this.orchestrationRun.orchestrationRunsId)
      .subscribe({
        next: (data: any) => {
          if (data.status === '0000') {
            if (data.detail.pipelineRuns.length != 0) {
              this.runsList.next(data.detail.pipelineRuns);
            }
          } else {
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }
}
