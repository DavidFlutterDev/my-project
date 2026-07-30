import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonSchemaRoutingModule } from './json-schema-routing.module';
import { AddjsonschemaComponent } from '../add-json-schema/add-json-schema.component';
import { JsonschemalistComponent } from './json-schema-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JsonSchemaRoutingModule,
    AddjsonschemaComponent,
    JsonschemalistComponent
  ]
})
export class JsonSchemaModule { }
