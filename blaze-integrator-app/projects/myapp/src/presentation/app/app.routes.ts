import { OrchestrationrundetailsComponent } from './pages/orchestration-run-details/orchestration-run-details.component';
import { OrchestrationhistorylistComponent } from './pages/orchestration-history-list/orchestration-history-list.component';
import { AddorchestrationComponent } from './pages/add-orchestration/add-orchestration.component';
import { OrchestrationlistComponent } from './pages/orchestration-list/orchestration-list.component';
import { PipelinerunsComponent } from './pages/pipeline-runs/pipeline-runs.component';
import { AddcomponentComponent } from './pages/add-component/add-component.component';
import { EditcomponentComponent } from './pages/edit-component/edit-component.component';
import { AddjsonschemaComponent } from './pages/add-json-schema/add-json-schema.component';
import { PipelinegeneratorlistComponent } from './pages/pipeline-generator-list/pipeline-generator-list.component';
import { JsonschemalistComponent } from './pages/json-schema-list/json-schema-list.component';
import { PipelinetemplatelistComponent } from './pages/pipeline-template-list/pipeline-template-list.component';
import { AddpipelinetemplategeneratorComponent } from './pages/add-pipeline-template-generator/add-pipeline-template-generator.component';
import { UpdateorchestrationdetailspopupComponent } from './pages/update-orchestration-details-popup/update-orchestration-details-popup.component';
import { Routes } from '@angular/router';
import { initialDataResolver } from './app.resolvers';
import { ClLayoutComponent } from '@clay/app-shell/structural';
import { DataMapperComponent } from './pages/data-mapper/data-mapper.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pipeline-template-generator' },

  {
    path: 'pipeline-template-generator',
    component: ClLayoutComponent,
    data: { breadcrum: 'Pipeline template generator' },
    resolve: { intialData: initialDataResolver },
    loadChildren: () =>
      import(
        './pages/pipeline-template-list/pipeline-template-routing.module'
      ).then((m) => m.PipelineTemplateRoutingModule),
  },
  {
    path: 'json-schema-generator',
    component: ClLayoutComponent,
    data: { breadcrum: 'Json schema generator' },
    resolve: { intialData: initialDataResolver },
    loadChildren: () =>
      import('./pages/json-schema-list/json-schema-routing.module').then(
        (m) => m.JsonSchemaRoutingModule,
      ),
  },

  {
    path: 'orchestration',
    component: ClLayoutComponent,
    data: { breadcrumb: 'Orchestration' },
    resolve: { initialData: initialDataResolver },
    loadChildren: () =>
      import('./pages/orchestration-list/orchestration-routing.module').then(
        (m) => m.OrchestrationRoutingModule,
      ),
  },

  {
    path: 'dashboard',
    component: ClLayoutComponent,
    data: { breadcrumb: 'Dashboard' },
    resolve: { initialData: initialDataResolver },
    children: [
      {
        path: 'add-pipeline-template-generator',
        component: AddpipelinetemplategeneratorComponent,
        data: { breadcrumb: 'Add pipeline template generator' },
      },
      {
        path: 'edit-pipeline-template-generator',
        component: AddpipelinetemplategeneratorComponent,
        data: { breadcrumb: 'edit pipeline template generator' },
      },
      {
        path: 'pipeline-template-list',
        component: PipelinetemplatelistComponent,
        data: { breadcrumb: 'Pipeline template list' },
      },
      {
        path: 'json-schema-list',
        component: JsonschemalistComponent,
        data: { breadcrumb: 'Json schema list' },
      },
      {
        path: 'pipeline-generator-list',
        component: PipelinegeneratorlistComponent,
        data: { breadcrumb: 'pipeline generator list' },
      },
      {
        path: 'add-json-schema',
        component: AddjsonschemaComponent,
        data: { breadcrumb: 'Add json schema' },
      },
      {
        path: 'edit-json-schema',
        component: AddjsonschemaComponent,
        data: { breadcrumb: 'edit json schema' },
      },
      {
        path: 'edit-component',
        component: EditcomponentComponent,
        data: { breadcrumb: 'Edit component' },
      },
      {
        path: 'add-component',
        component: AddcomponentComponent,
        data: { breadcrumb: 'Add component' },
      },
      {
        path: 'edit-component',
        component: AddcomponentComponent,
        data: { breadcrumb: 'Edit component' },
      },
      {
        path: 'pipeline-runs',
        component: PipelinerunsComponent,
        data: { breadcrumb: 'pipeline runs' },
      },
      {
        path: 'orchestration-list',
        component: OrchestrationlistComponent,
        data: { breadcrumb: 'orchestration list' },
      },
      {
        path: 'add-orchestration',
        component: AddorchestrationComponent,
        data: { breadcrumb: 'Add orchestration' },
      },
      {
        path: 'edit-orchestration',
        component: AddorchestrationComponent,
        data: { breadcrumb: 'Edit orchestration' },
      },
      {
        path: 'edit-orchestration',
        component: AddorchestrationComponent,
        data: { breadcrumb: 'Edit orchestration' },
      },
      {
        path: 'orchestration-history-list',
        component: OrchestrationhistorylistComponent,
        data: { breadcrumb: 'orchestration history  list ' },
      },
      {
        path: 'orchestration-run-details',
        component: OrchestrationrundetailsComponent,
        data: { breadcrumb: 'orchestration run details' },
      },
      {
        path: 'update-orchestration-details-popup',
        component: UpdateorchestrationdetailspopupComponent,
        data: { breadcrumb: 'update orchestration details popup' },
      },
    ],
  },
];
