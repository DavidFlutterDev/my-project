import { inject, Component, OnInit, Injectable } from '@angular/core';
import { OrchestrationlistService } from './orchestration-list.service';
import {
  ClCardComponent,
  ClCardProperties,
  ClDataGridComponent,
  ClTableConfigProperties,
} from '@clay/ui-components/containers';
import {
  ClIconComponent,
  ClIconProperties,
  ClLabelComponent,
  ClLabelProperties,
  ClButtonComponent,
  ClButtonProperties,
} from '@clay/ui-components/basic';
import { ApiVariables } from '../../utils/api.variables';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { DatePipe } from '@angular/common';
import { CommonDateService } from '../common-services/common-date-services';
import { BreadcrumbComponent } from '../../templates/breadcrumb/breadcrumb.component';
import { RoutingVariables } from '../../utils/routing.variables';

@Component({
  standalone: true,
  selector: 'app-orchestration-list',
  styleUrl: './orchestration-list.component.scss',
  templateUrl: './orchestration-list.component.html',
  imports: [
    ClCardComponent,
    ClIconComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClDataGridComponent,
    BreadcrumbComponent,
  ],
  providers: [OrchestrationlistService, CommonDateService],
})
@Injectable({
  providedIn: 'root',
})
export class OrchestrationlistComponent implements OnInit {
  constructor() {}

  protected orchestrationlistService: OrchestrationlistService = inject(
    OrchestrationlistService,
  );
  protected card2Properties!: ClCardProperties;
  isListDataAvailable: boolean = true;

  breadcrumbData = [
    {
      label: 'Orchestration',
      // routeUrl: RoutingVariables.orchestrationRoute
    }
  ];

  onClickBack() {
    console.log('on click back');
  }

  ngOnInit(): void {
    this.card2Properties = this.orchestrationlistService.card2Properties;

    this.icon0Properties = this.orchestrationlistService.icon0Properties;

    this.noDataTextProperties =
      this.orchestrationlistService.noDataTextProperties;

    this.addNewProperties = this.orchestrationlistService.addNewProperties;

    this.listCardProperties = this.orchestrationlistService.listCardProperties;

    this.dataGrid8Properties =
      this.orchestrationlistService.dataGrid8Properties;

    this.getOrchestrationList();
  }

  protected icon0Properties!: ClIconProperties;
  protected noDataTextProperties!: ClLabelProperties;
  protected addNewProperties!: ClButtonProperties;
  protected listCardProperties!: ClCardProperties;
  protected dataGrid8Properties!: ClTableConfigProperties;

  public getOrchestrationList() {
    this.orchestrationlistService.getOrchestrationList();
  }
}
