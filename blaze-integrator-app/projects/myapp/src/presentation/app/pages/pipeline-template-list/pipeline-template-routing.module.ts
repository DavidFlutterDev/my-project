import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipelinetemplatelistComponent } from './pipeline-template-list.component';
import { AddpipelinetemplategeneratorComponent } from '../add-pipeline-template-generator/add-pipeline-template-generator.component';

const routes: Routes = [
  {
    path: '',
    title: 'Pipeline template generator',
    pathMatch: 'full',
    component: PipelinetemplatelistComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'add',
    title: 'add Pipeline template generator',
    component: AddpipelinetemplategeneratorComponent,
    data: { breadcrumb: 'Add' },
  },
  {
    path: 'edit',
    title: 'edit Pipeline template generator',
    component: AddpipelinetemplategeneratorComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PipelineTemplateRoutingModule {}
