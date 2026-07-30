import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrchestrationRoutingModule } from './orchestration-routing.module'
import { AddorchestrationComponent } from '../add-orchestration/add-orchestration.component';
import { OrchestrationhistorylistComponent } from '../orchestration-history-list/orchestration-history-list.component';
import { OrchestrationrundetailsComponent } from '../orchestration-run-details/orchestration-run-details.component';
import { OrchestrationlistComponent } from './orchestration-list.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AddorchestrationComponent,
    OrchestrationlistComponent,
    OrchestrationhistorylistComponent,
    OrchestrationrundetailsComponent,
    CommonModule,
    OrchestrationRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrchestrationModule {}
