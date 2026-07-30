import { Component, inject, OnInit } from '@angular/core';
import { PipelinegeneratorlistService } from './pipeline-generator-list.service';
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
  ClToastService,
} from '@clay/ui-components/basic';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pipeline-generator-list',
  styleUrl: './pipeline-generator-list.component.scss',
  templateUrl: './pipeline-generator-list.component.html',
  imports: [
    ClCardComponent,
    ClIconComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClDataGridComponent,
  ],
  providers: [PipelinegeneratorlistService, DatePipe, ClToastService],
})
export class PipelinegeneratorlistComponent implements OnInit {
  constructor() {}

  protected pipelinegeneratorlistService: PipelinegeneratorlistService = inject(
    PipelinegeneratorlistService,
  );
  protected noDataCardProperties!: ClCardProperties;
  isPipelinesDataAvailable: boolean = false;

  ngOnInit(): void {
    this.noDataCardProperties =
      this.pipelinegeneratorlistService.noDataCardProperties;

    this.noDataIconProperties =
      this.pipelinegeneratorlistService.noDataIconProperties;

    this.NoDataLabelProperties =
      this.pipelinegeneratorlistService.NoDataLabelProperties;

    this.addButtonProperties =
      this.pipelinegeneratorlistService.addButtonProperties;

    this.dataCardProperties =
      this.pipelinegeneratorlistService.dataCardProperties;

    this.dataGrid1Properties =
      this.pipelinegeneratorlistService.dataGrid1Properties;

    this.isPipelinesDataAvailable =
      this.pipelinegeneratorlistService.isPipelinesDataAvailable;

      this.getpipelineList();

    }

  protected noDataIconProperties!: ClIconProperties;
  protected NoDataLabelProperties!: ClLabelProperties;
  protected addButtonProperties!: ClButtonProperties;
  protected dataCardProperties!: ClCardProperties;
  protected dataGrid1Properties!: ClTableConfigProperties;


  getpipelineList() {
    this.pipelinegeneratorlistService.getpipelineList();
  }
}
