import { Component, inject, OnInit } from '@angular/core';
import { JsonschemalistService } from './json-schema-list.service';
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
import { BreadcrumbComponent } from "../../templates/breadcrumb/breadcrumb.component";

@Component({
  standalone: true,
  selector: 'app-json-schema-list',
  styleUrl: './json-schema-list.component.scss',
  templateUrl: './json-schema-list.component.html',
  imports: [
    ClCardComponent,
    ClIconComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClDataGridComponent,
    BreadcrumbComponent
],
  providers: [JsonschemalistService, DatePipe, ClToastService],
})
export class JsonschemalistComponent implements OnInit {
  constructor() {}

  protected jsonschemalistService: JsonschemalistService = inject(
    JsonschemalistService,
  );
  protected noDataCardProperties!: ClCardProperties;
  isSchemasDataAvailable: boolean = true;

  ngOnInit(): void {
    this.noDataCardProperties = this.jsonschemalistService.noDataCardProperties;

    this.noDataIconProperties = this.jsonschemalistService.noDataIconProperties;

    this.noDataLabelProperties =
      this.jsonschemalistService.noDataLabelProperties;

    this.AddButtonProperties = this.jsonschemalistService.AddButtonProperties;

    this.dataCardProperties = this.jsonschemalistService.dataCardProperties;

    this.dataGrid2Properties = this.jsonschemalistService.dataGridProperties;

    this.isSchemasDataAvailable = this.jsonschemalistService.isSchemasDataAvailable;

    this.getJsonSchemasList();
  }

  protected noDataIconProperties!: ClIconProperties;
  protected noDataLabelProperties!: ClLabelProperties;
  protected AddButtonProperties!: ClButtonProperties;
  protected dataCardProperties!: ClCardProperties;
  protected dataGrid2Properties!: ClTableConfigProperties;


  getJsonSchemasList() {
    this.jsonschemalistService.getValidationSchemasList();
  }
}
