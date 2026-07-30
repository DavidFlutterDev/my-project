import { inject, Component, OnInit } from '@angular/core';
import { OrchestrationhistorylistService } from './orchestration-history-list.service';
import {
  ClButtonComponent,
  ClButtonProperties,
  ClLabelComponent,
  ClLabelProperties,
} from '@clay/ui-components/basic';
import {
  ClCardComponent,
  ClCardProperties,
  ClDataGridComponent,
  ClTableConfigProperties,
} from '@clay/ui-components/containers';
import { Router } from '@angular/router';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { CommonDateService } from '../common-services/common-date-services';
import { DatePipe } from '@angular/common';
import { BreadcrumbComponent } from "../../templates/breadcrumb/breadcrumb.component";
import { RoutingVariables } from '../../utils/routing.variables';

@Component({
  standalone: true,
  selector: 'app-orchestration-history-list',
  styleUrl: './orchestration-history-list.component.scss',
  templateUrl: './orchestration-history-list.component.html',
  imports: [
    ClButtonComponent,
    ClCardComponent,
    ClLabelComponent,
    ClDataGridComponent,
    BreadcrumbComponent
],
  providers: [OrchestrationhistorylistService, CommonDateService],
})
export class OrchestrationhistorylistComponent implements OnInit {
  constructor(
    private router: Router,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
    private commonDateService : CommonDateService
  ) {
    this.checkforPageArguments();
  }

  protected orchestrationhistorylistService: OrchestrationhistorylistService =
    inject(OrchestrationhistorylistService);
  protected editBtProperties!: ClButtonProperties;



  ngOnInit(): void {
    this.editBtProperties =
      this.orchestrationhistorylistService.editBtProperties;

    this.deleteButtonProperties =
      this.orchestrationhistorylistService.deleteButtonProperties;

    this.card0Properties = this.orchestrationhistorylistService.card0Properties;

    this.OrchestrationNameLabelProperties =
      this.orchestrationhistorylistService.OrchestrationNameLabelProperties;

    this.OrchestrationNameValueLabelProperties =
      this.orchestrationhistorylistService.OrchestrationNameValueLabelProperties;

    this.OrchestrationTemplateLabelProperties =
      this.orchestrationhistorylistService.OrchestrationTemplateLabelProperties;

    this.orchestrationTemplateValueLabelProperties =
      this.orchestrationhistorylistService.orchestrationTemplateValueLabelProperties;

    this.CreatedOnProperties =
      this.orchestrationhistorylistService.CreatedOnProperties;

    this.createdOnLabelProperties =
      this.orchestrationhistorylistService.createdOnLabelProperties;

    this.card1Properties = this.orchestrationhistorylistService.card1Properties;

    this.label6Properties =
      this.orchestrationhistorylistService.label6Properties;

    this.dataGrid1Properties =
      this.orchestrationhistorylistService.dataGrid1Properties;

      this.orchestrationData = this.orchestrationhistorylistService.orchestrationData;
  }

  protected deleteButtonProperties!: ClButtonProperties;
  protected card0Properties!: ClCardProperties;
  protected OrchestrationNameLabelProperties!: ClLabelProperties;
  protected OrchestrationNameValueLabelProperties!: ClLabelProperties;
  protected OrchestrationTemplateLabelProperties!: ClLabelProperties;
  protected orchestrationTemplateValueLabelProperties!: ClLabelProperties;
  protected CreatedOnProperties!: ClLabelProperties;
  protected createdOnLabelProperties!: ClLabelProperties;
  protected card1Properties!: ClCardProperties;
  protected label6Properties!: ClLabelProperties;
  protected dataGrid1Properties!: ClTableConfigProperties;
  protected orchestrationData: any;

  checkforPageArguments() {
    var recievedData = JSON.stringify(
      this.router.getCurrentNavigation()?.extras.state,
      // {"orchestrationsId":13,"orchestrationsName":"rupay_incoming1","orchestrationTemplatesId":1,"orchestrationTemplate":"rupay_incoming","dmlOn":""}
    );
    console.log('recievedData: ', recievedData);
    if (recievedData != undefined && recievedData != null) {
      this.orchestrationhistorylistService.orchestrationData =
        recievedData != null && recievedData != undefined
          ? JSON.parse(recievedData)
          : { data: '' };
      console.log('orchestrationsId from list screen', this.orchestrationhistorylistService.orchestrationData);
      setTimeout(() => {

        this.orchestrationhistorylistService.breadcrumbData[1].label= this.orchestrationData.orchestrationsName;
        this.orchestrationhistorylistService.OrchestrationNameValueLabelProperties.label =
          this.orchestrationData.orchestrationsName;
        this.orchestrationhistorylistService.orchestrationTemplateValueLabelProperties.label =
          this.orchestrationData.orchestrationTemplate;
        this.orchestrationhistorylistService.createdOnLabelProperties.label =
          this.orchestrationData.dmlOn;
          this.orchestrationhistorylistService.getOrchestrationHistoryList();

      }, 500);
    } else {
      console.log('null');
    }
  }
}
