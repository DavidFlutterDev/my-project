import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineTemplateRoutingModule } from './pipeline-template-routing.module';
import { PipelinetemplatelistComponent } from './pipeline-template-list.component';
import { AddpipelinetemplategeneratorComponent } from '../add-pipeline-template-generator/add-pipeline-template-generator.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipelineTemplateRoutingModule,
    PipelinetemplatelistComponent,
    AddpipelinetemplategeneratorComponent,
  ],
})
export class PipelineTemplateModule {}
