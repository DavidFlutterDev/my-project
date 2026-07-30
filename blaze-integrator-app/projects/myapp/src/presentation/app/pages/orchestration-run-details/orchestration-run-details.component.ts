import { inject, Component, OnInit, Inject } from '@angular/core';
import { OrchestrationrundetailsService } from './orchestration-run-details.service';
import {
  ClLabelComponent,
  ClLabelProperties,
  ClIconComponent,
  ClIconProperties,
} from '@clay/ui-components/basic';
import {
  ClCardComponent,
  ClCardProperties,
} from '@clay/ui-components/containers';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../../templates/breadcrumb/breadcrumb.component";

@Component({
  standalone: true,
  selector: 'app-orchestration-run-details',
  styleUrl: './orchestration-run-details.component.scss',
  templateUrl: './orchestration-run-details.component.html',
  imports: [ClLabelComponent, ClIconComponent, ClCardComponent, CommonModule, BreadcrumbComponent],
  // providers: [OrchestrationrundetailsService],
  providers: [
    OrchestrationrundetailsService,
  ],
})
export class OrchestrationrundetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
  ) {
    if (data != null) {
      this.orchestrationRun = data.orchestrationRun;
    }
    console.log('orchestration: ', this.orchestrationRun);
  }

  protected orchestrationrundetailsService: OrchestrationrundetailsService =
    inject(OrchestrationrundetailsService);
  protected staticTitleProperties!: ClLabelProperties;

  protected dynamicTitleProperties!: ClLabelProperties;
  protected closeIconProperties!: ClIconProperties;
  protected card0Properties!: ClCardProperties;
  protected card1Properties!: ClCardProperties;
  protected label6Properties!: ClLabelProperties;

  orchestrationRun: any;
  runsList: any;
  commonColumnClass: any;
  topPaddingOfDetailsTile = '24px';


  ngOnInit(): void {
    this.commonColumnClass =
      this.orchestrationrundetailsService.commonColumnClass;

    this.staticTitleProperties =
      this.orchestrationrundetailsService.staticTitleProperties;

    this.dynamicTitleProperties =
      this.orchestrationrundetailsService.dynamicTitleProperties;

    this.closeIconProperties =
      this.orchestrationrundetailsService.closeIconProperties;

    this.card0Properties = this.orchestrationrundetailsService.card0Properties;

    this.card1Properties = this.orchestrationrundetailsService.card1Properties;

    this.label6Properties =
      this.orchestrationrundetailsService.label6Properties;

    this.orchestrationrundetailsService.runsList.subscribe((data: any) => {
      this.runsList = data;
    });

    if (this.orchestrationRun != null || this.orchestrationRun != undefined) {
      console.log('orchestration: ', this.orchestrationRun);
      this.orchestrationrundetailsService.setOrchestrationRunDetails(
        this.orchestrationRun,
      );
      this.orchestrationrundetailsService.getHistoryDetails();
    }
  }

  ngAfterViewInit() {
    this.checkIfScrollable();
  }

  titleLabelTileProperties(label: any) {
    return this.orchestrationrundetailsService.titleLabelTileProperties(label);
  }
  valueLabelTileProperties(label: any) {
    return this.orchestrationrundetailsService.valueLabelTileProperties(label);
  }

  subHeadingProperties(label: any) {
    return this.orchestrationrundetailsService.subHeadingProperties(label);
  }
  checkIfScrollable() {
    const content = document.getElementById('mainCol');
    if (content) {
      var isScrollable = content.scrollHeight > content.clientHeight;
      console.log('Content is scrollable:', isScrollable);
    }
  }
}
