import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddorchestrationComponent } from '../add-orchestration/add-orchestration.component';
import { OrchestrationrundetailsComponent } from '../orchestration-run-details/orchestration-run-details.component';
import { OrchestrationlistComponent } from './orchestration-list.component';
import { OrchestrationhistorylistComponent } from '../orchestration-history-list/orchestration-history-list.component';

const routes: Routes = [
  {
    path: '',
    title: 'orchestration list',
    pathMatch: 'full',
    component: OrchestrationlistComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'add',
    title: 'add orchestration',
    component: AddorchestrationComponent,
    data: { breadcrumb: 'Add' },
  },
  {
    path: 'edit',
    title: 'edit orchestration',
    component: AddorchestrationComponent,
    data: { breadcrumb: 'Edit' },
  },
  {
    path: 'details',
    title: 'Orchestration details',
    component: OrchestrationhistorylistComponent,
    data: { breadcrumb: 'details' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrchestrationRoutingModule {}
