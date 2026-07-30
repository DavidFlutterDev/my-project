import { Component, inject, OnInit } from '@angular/core';
import { PipelinetemplatelistService } from './pipeline-template-list.service';
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
import { setTimeout } from 'timers';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommonToastService } from '../common-services/common-toast.services';
import { BreadcrumbComponent } from "../../templates/breadcrumb/breadcrumb.component";

@Component({
  standalone: true,
  selector: 'app-pipeline-template-list',
  styleUrl: './pipeline-template-list.component.scss',
  templateUrl: './pipeline-template-list.component.html',
  imports: [
    ClCardComponent,
    ClIconComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClDataGridComponent,
    BreadcrumbComponent
],
  providers: [PipelinetemplatelistService, DatePipe,  CommonToastService],
})
export class PipelinetemplatelistComponent implements OnInit {
  constructor() {}

  protected pipelinetemplatelistService: PipelinetemplatelistService = inject(
    PipelinetemplatelistService,
  );
  protected noDataCardProperties!: ClCardProperties;
  isTemplatesDataAvailable: boolean = true;
  ngOnInit(): void {
    this.noDataCardProperties =
      this.pipelinetemplatelistService.noDataCardProperties;

    this.noDataIconProperties =
      this.pipelinetemplatelistService.noDataIconProperties;

    this.noDataLabelProperties =
      this.pipelinetemplatelistService.noDataLabelProperties;

    this.addButtonProperties =
      this.pipelinetemplatelistService.addButtonProperties;

    this.dataCardProperties =
      this.pipelinetemplatelistService.dataCardProperties;

    this.dataGrid0Properties =
      this.pipelinetemplatelistService.dataGrid0Properties;

    this.isTemplatesDataAvailable = this.pipelinetemplatelistService.isTemplatesDataAvailable;

    this.getTemplateList();
  }

  protected noDataIconProperties!: ClIconProperties;
  protected noDataLabelProperties!: ClLabelProperties;
  protected addButtonProperties!: ClButtonProperties;
  protected dataCardProperties!: ClCardProperties;
  protected dataGrid0Properties!: ClTableConfigProperties;

  getTemplateList() {
    this.pipelinetemplatelistService.getTemplateList();
  }
}
