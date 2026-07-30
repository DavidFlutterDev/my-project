import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonschemalistComponent } from './json-schema-list.component';
import { AddjsonschemaComponent } from '../add-json-schema/add-json-schema.component';

const routes: Routes = [
  {
    path: '',
    title: 'Json schema generator list',
    pathMatch: 'full',
    component: JsonschemalistComponent,
    data: { breadcrumb: '' },
  },
  {
    path: 'add',
    title: 'add json schema generator',
    component: AddjsonschemaComponent,
    data: { breadcrumb: 'Add' },
  },
  {
    path: 'edit',
    title: 'edit json schema generator',
    component: AddjsonschemaComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonSchemaRoutingModule { }
