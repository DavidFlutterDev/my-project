import {
  inject,
  Component,
  OnInit,
  signal,
  WritableSignal,
  computed,
} from '@angular/core';

import { AddcomponentService } from './add-component.service';
import {
  ClCardComponent,
  ClCardProperties,
} from '@clay/ui-components/containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  validateShape,
  FormDirective,
  FormModelDirective,
} from '@clay/ui-components/form-validations';
import { createform_1ValidationSuite } from './add-component.validations';
import { pipelinesdatamodelShape } from '../../models/pipelinesdatamodel';
import {
  ClInputComponent,
  ClInputProperties,
  ClSelectComponent,
  ClSelectProperties,
  ClButtonComponent,
  ClButtonProperties,
  ClToastService,
} from '@clay/ui-components/basic';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { CommonToastService } from '../common-services/common-toast.services';
import { DataMapperComponent } from '../data-mapper/data-mapper.component';
import { DataMapping } from '../data-mapper/properties/data-mapper.properties';

@Component({
  standalone: true,
  selector: 'app-add-component',
  styleUrl: './add-component.component.scss',
  templateUrl: './add-component.component.html',
  imports: [
    ClCardComponent,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClSelectComponent,
    ClButtonComponent,
    ReactiveFormsModule,
    FormModelDirective,
    DataMapperComponent,
  ],
  providers: [AddcomponentService, ClToastService, CommonToastService],
})
export class AddcomponentComponent implements OnInit {
  constructor(
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) {}

  protected addcomponentService: AddcomponentService =
    inject(AddcomponentService);

  protected card0Properties!: ClCardProperties;
  protected templateStructure: any;
  protected hideVerticalForm: boolean = false;
  // public readonly form_1Valid = signal<boolean>(false);
  dataPipeline?: DataMapping;

  ngOnInit(): void {
    this.card0Properties = this.addcomponentService.card0Properties;

    this.form_1FormValue = this.addcomponentService.form_1FormValue;

    this.input1Properties = this.addcomponentService.input1Properties;

    this.templateDropdownProperties =
      this.addcomponentService.templateDropdownProperties;

    this.continueButtonProperties =
      this.addcomponentService.continueButtonProperties;

    this.getTemplateList();
  }

  protected form_1FormValue!: WritableSignal<any>;
  protected readonly form_1Suite = createform_1ValidationSuite;
  protected readonly form_1FormValid = signal<boolean>(false);
  protected readonly form_1Errors = signal<Record<string, string>>({});
  private readonly form_1ViewModel = computed(() => {
    return {
      errors: this.form_1Errors(),
      formValid: this.form_1FormValid(),
      formValue: this.form_1FormValue(),
    };
  });

  protected get form_1Vm() {
    return this.form_1ViewModel();
  }

  protected setform_1FormValue(v: any) {
    this.form_1FormValue.set(v);

    validateShape(v, pipelinesdatamodelShape);

    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected validateAll() {
    if (this.form_1FormValid()) {
      this.addcomponentService.continueButtonDisabled.set(false);
    } else {
      this.addcomponentService.continueButtonDisabled.set(true);
    }
  }

  protected input1Properties!: ClInputProperties;
  protected templateDropdownProperties!: ClSelectProperties;
  protected continueButtonProperties!: ClButtonProperties;

  getTemplateList() {
    this.addcomponentService.getTemplateList();
  }

  onTapContinue() {
    this.getTemplateDetails(this.form_1FormValue().templateid);
  }

  onTapProceed() {
    // console.log(this.dataMapperService.dataMapping);
  }

  public getTemplateDetails(id: any) {
    this.setDataMapper();
    setTimeout(() => {
      this.loadFlowChartView();
    }, 1000);
  }

  loadFlowChartView() {
    this.hideVerticalForm = true;
    this.addcomponentService.continueButtonProperties.label = 'Proceed';
    this.addcomponentService.templateDropdownProperties.disabled = false;
  }

  setDataMapper() {
    let tempDataPipeline = this.addcomponentService.generateDataMapperJson(
      this.inputTemp['detail']['structure'],
    );
    setTimeout(() => {
      this.dataPipeline = tempDataPipeline as DataMapping;
    });
  }



  inputTemp: any = {
    traceId: '92b47fcc-5e92418d-a989-b231543715e0',
    type: '',
    title: 'SUCCESS',
    status: '0000',
    detail: {
      templatesId: 27,
      templateName: 'rupay_incoming_raw_file_data',
      structure: {
        input: {
          sftp: {
            paths: ['${file_path}'],
            address: '',
            scanner: { xml: {} },
            credentials: { password: '', username: '' },
          },
        },
        output: {
          switch: {
            cases: [
              {
                output: {
                  fallback: {
                    outputs: [
                      {
                        sequential: {
                          outputs: [
                            {
                              sql_insert: {
                                hosts: [''],
                                table: 'exceptions',
                                driver: 'mysql',
                                schema: 'settlement',
                                password: '',
                                username: '',
                                columns_field_mapping: {
                                  data: 'content',
                                  error: 'error()',
                                },
                              },
                            },
                            {
                              update_run_status: {
                                hosts: 'localhost',
                                driver: 'mysql',
                                schema: 'integrator',
                                password: 'password',
                                username: 'root',
                              },
                            },
                          ],
                        },
                      },
                      {
                        update_run_status: {
                          hosts: 'localhost',
                          driver: 'mysql',
                          schema: 'integrator',
                          password: 'password',
                          username: 'root',
                        },
                      },
                    ],
                  },
                },
                condition: 'errored()',
              },
              {
                output: {
                  fallback: {
                    outputs: [
                      {
                        sql_insert: {
                          hosts: [''],
                          table: 'rupay_raw_file_data',
                          driver: 'mysql',
                          schema: 'settlement',
                          password: '',
                          username: '',
                          columns_field_mapping: {
                            mti: 'nMTI',
                            file_type: '01',
                            record_data: 'content',
                            function_code: 'nFunCd',
                            record_number: 'record_number',
                          },
                        },
                      },
                      {
                        update_run_status: {
                          hosts: 'localhost',
                          driver: 'mysql',
                          schema: 'integrator',
                          password: 'password',
                          username: 'root',
                        },
                      },
                    ],
                  },
                },
                condition: '!errored()',
              },
            ],
          },
        },
        processors: [
          { xml_parser: {} },
          { json_schema: { schema_id: '' } },
          {
            sequential: {
              processors: [
                { xml_parser: {} },
                { json_schema: { schema_id: '' } },
              ],
            },
          },
          {
            switch: {
              cases: [
                {
                  condition: 'errored()',
                  processors: [
                    {
                      bloblang: {
                        expression: 'root.content = this.format_xml()',
                      },
                    },
                  ],
                },
                {
                  condition: '!errored()',
                  processors: [
                    {
                      bloblang: { expression: 'root = this.File.TxnBlock.Txn' },
                    },
                    { splitter: { format: 'json_array' } },
                    {
                      bloblang: {
                        expression:
                          'root = this \\n root.content = this.format_xml().replace("doc>", "txn>") \\n root.record_number = batch_index()',
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      status: 'active',
      tenantCode: '1000',
    },
  };

  outputTemp = {
    id: 'cbbcf1e8-e30f-4ebc-bc88-37a66f6c22c1',
    sources: [
      {
        type: 'single',
        id: '55e1d430-f1bf-465a-b806-985f4db6f216',
        label: 'sftp',
        icon: 'input',
        children: [],
        data: {
          paths: ['${file_path}'],
          address: '',
          scanner: { xml: {} },
          credentials: { password: '', username: '' },
        },
      },
    ],
    destination: {
      type: 'tree',
      id: '94a7bea8-d4f9-4140-9457-9d5ef6739c4f',
      label: 'Input 1',
      icon: 'heroicons_outline:stop-circle',
      children: [
        {
          type: 'treeCondition',
          id: '9df74f17-1f4d-4091-8e03-a30430752587',
          label: 'errored()',
          icon: 'heroicons_outline:circle-stack',
          children: [
            {
              type: 'group',
              id: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
              label: 'fallback',
              children: [
                {
                  type: 'group',
                  id: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
                  parentId: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
                  label: 'sequential',
                  children: [
                    {
                      type: 'single',
                      id: 'b98afc48-76e8-4493-b118-80d4ac434fe1',
                      icon: 'circle-stack',
                      label: 'sql_insert',
                      parentId: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
                      data: {
                        hosts: [''],
                        table: 'exceptions',
                        driver: 'mysql',
                        schema: 'settlement',
                        password: '',
                        username: '',
                        columns_field_mapping: {
                          data: 'content',
                          error: 'error()',
                        },
                      },
                    },
                    {
                      type: 'single',
                      id: 'b98afc48-76e8-4493-b118-80d4ac434asdfe1',
                      icon: 'circle-stack',
                      label: 'update_run_status',
                      parentId: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
                      data: {
                        hosts: 'localhost',
                        driver: 'mysql',
                        schema: 'integrator',
                        password: 'password',
                        username: 'root',
                      },
                    },
                  ],
                },
                {
                  type: 'single',
                  id: 'c9b25271-7ea4-4ef7-9989-86d6e4c47795',
                  children: [],
                  icon: 'circle-stack',
                  label: 'trim',
                  parentId: 'b98afc48-76e8dd-4493-b118-80d4ac434fe1',
                },
              ],
            },
          ],
        },
        {
          type: 'treeCondition',
          id: '9df74f17-1f4d-4091-8e0d3-a30430752587',
          label: '!errored()',
          icon: 'heroicons_outline:circle-stack',
          children: [
            {
              type: 'group',
              id: 'b98afc48-76e8dd-4493-bsds118-80d4ac434fe1',
              label: 'fallback',
              children: [
                {
                  type: 'single',
                  id: 'b98afc48-76e8-asdsd4493-b118-80d4ac434fe1',
                  icon: 'circle-stack',
                  label: 'sql_insert',
                  parentId: 'b98afc48-76e8dd-4493-bsds118-80d4ac434fe1',
                  data: {
                    hosts: [''],
                    table: 'exceptions',
                    driver: 'mysql',
                    schema: 'settlement',
                    password: '',
                    username: '',
                    columns_field_mapping: {
                      data: 'content',
                      error: 'error()',
                    },
                  },
                },
                {
                  type: 'single',
                  id: 'b98afc48-76e8-4493-b118-80d4aasdc434asdfe1',
                  icon: 'circle-stack',
                  label: 'update_run_status',
                  parentId: 'b98afc48-76e8dd-4493-bsds118-80d4ac434fe1',
                  data: {
                    hosts: 'localhost',
                    driver: 'mysql',
                    schema: 'integrator',
                    password: 'password',
                    username: 'root',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    processes: [
      {
        type: 'single',
        id: '9a5381c6-795e-4239-9183-fc3cc389f155',
        icon: 'heroicons_outline:stop-circle',
        label: 'xml_parser',
      },
      {
        type: 'single',
        id: '9a5381c6-795e-4239-9183-ffdsc3cc389f155',
        icon: 'heroicons_outline:stop-circle',
        label: 'json_schema',
        data: {
          schema_id: '',
        },
      },
      {
        type: 'group',
        id: '9a5381c6-795e-4239-9ds183-fc3cc389f155',
        icon: 'heroicons_outline:stop-circle',
        label: 'sequential',
        children: [
          {
            type: 'single',
            id: '9a5381c6-795e-423asd9-9183-fc3cc389f155',
            icon: 'heroicons_outline:stop-circle',
            label: 'xml_parser',
          },
          {
            type: 'single',
            id: '9a5381c6-795e-42dads39-9183-fc3cc389f155',
            icon: 'heroicons_outline:stop-circle',
            label: 'json_schema',
            data: {
              schema_id: '',
            },
          },
        ],
      },

      {
        type: 'tree',
        id: 'b82ec61a-5603-4991-9513-0941bf6dd8dd',
        children: [
          {
            type: 'treeCondition',
            id: 'ff0631d5-9f5b-4109-990f-bec9ec8d9ef3',
            label: 'errored()',
            parentId: 'b82ec61a-5603-4991-9513-0941bf6dd8dd',
            children: [
              {
                type: 'single',
                id: '917e6740-2bb6-4998-8b6c-bf2562fa96c6',
                children: [],
                icon: 'heroicons_outline:stop-circle',
                label: 'bloblang',
                data: {
                  expression: 'root.content = this.format_xml()',
                },
              },
            ],
          },
          {
            type: 'treeCondition',
            id: 'ff0a9924-5b71-4d0f-898a-9fb6326214c0',
            label: '!errored()',
            children: [
              {
                type: 'single',
                id: '792fee64-0b5a-4ba1-955b-3b5314c9940d',
                children: [],
                icon: 'heroicons_outline:schema',
                label: 'bloblang',
                data: {
                  expression: 'root = this.File.TxnBlock.Txn',
                },
              },
              {
                type: 'single',
                id: '792fee64-0b5a-4ba1-955b-3dsab5314c9940d',
                children: [],
                icon: 'heroicons_outline:schema',
                label: 'splitter',
              },
              {
                type: 'single',
                id: '792fee64-0b5a-4ba1-955b-3b5314casdsa9940d',
                children: [],
                icon: 'heroicons_outline:schema',
                label: 'bloblang',
              },
            ],
            parentId: 'b82ec61a-5603-4991-9513-0941bf6dd8dd',
          },
        ],
        label: 'switch',
        icon: 'stop-circle',
      },
    ],
  };

  temp: any = {
    id: 'cf0549b2-459e-498d-8f51-48a4df92d153',
    sources: [
      {
        id: 'da31a4de-6c6a-4b91-a8e7-4413871fbf60',
        label: 'sftp',
        icon: 'heroicons_outline:question-mark-circle',
        data: {
          paths: ['${file_path}'],
          address: '',
          scanner: {
            xml: {},
          },
          credentials: {
            password: '',
            username: '',
          },
        },
        type: 'single',
      },
    ],
    destination: {
      id: '2b57c3a7-ae21-4fbc-bdb0-3f64278c5b19',
      label: 'switch',
      icon: 'heroicons_outline:question-mark-circle',
      type: 'tree',
      children: [
        {
          id: '621d79e1-de47-4960-8e42-0596c5face79',
          label: 'errored()',
          icon: 'heroicons_outline:question-mark-circle',
          parentId: '2b57c3a7-ae21-4fbc-bdb0-3f64278c5b19',
          type: 'treeCondition',
          children: [
            {
              id: '41c86136-2e5b-4e44-92be-cfdf8c1022cf',
              label: 'fallback',
              icon: 'heroicons_outline:question-mark-circle',
              parentId: '2b57c3a7-ae21-4fbc-bdb0-3f64278c5b19',
              type: 'group',
              children: [
                {
                  id: '9ff27b22-fccb-4951-beb0-0daf9c48ae0c',
                  label: 'sequential',
                  icon: 'heroicons_outline:question-mark-circle',
                  parentId: '41c86136-2e5b-4e44-92be-cfdf8c1022cf',
                  type: 'group',
                  children: [
                    {
                      id: '35568dc0-085b-463f-a7ce-8630d0403169',
                      label: 'sql_insert',
                      icon: 'heroicons_outline:question-mark-circle',
                      parentId: '9ff27b22-fccb-4951-beb0-0daf9c48ae0c',
                      data: {
                        hosts: [''],
                        table: 'exceptions',
                        driver: 'mysql',
                        schema: 'settlement',
                        password: '',
                        username: '',
                        columns_field_mapping: {
                          data: 'content',
                          error: 'error()',
                        },
                      },
                      type: 'single',
                    },
                    {
                      id: 'bd060043-14b6-4a63-a9d5-0fecaf718d2f',
                      label: 'update_run_status',
                      icon: 'heroicons_outline:question-mark-circle',
                      parentId: '9ff27b22-fccb-4951-beb0-0daf9c48ae0c',
                      data: {
                        hosts: 'localhost',
                        driver: 'mysql',
                        schema: 'integrator',
                        password: 'password',
                        username: 'root',
                      },
                      type: 'single',
                    },
                  ],
                },
                {
                  id: 'e7f1f17e-67a7-48fb-b659-dc10a247186b',
                  label: 'update_run_status',
                  icon: 'heroicons_outline:question-mark-circle',
                  parentId: '41c86136-2e5b-4e44-92be-cfdf8c1022cf',
                  data: {
                    hosts: 'localhost',
                    driver: 'mysql',
                    schema: 'integrator',
                    password: 'password',
                    username: 'root',
                  },
                  type: 'single',
                },
              ],
            },
          ],
        },
        {
          id: '140039fd-2fe7-4660-81eb-245699439000',
          label: '!errored()',
          icon: 'heroicons_outline:question-mark-circle',
          parentId: '2b57c3a7-ae21-4fbc-bdb0-3f64278c5b19',
          type: 'treeCondition',
          children: [
            {
              id: '0ec93a0a-3273-42a2-ba5a-7168dcd46139',
              label: 'fallback',
              icon: 'heroicons_outline:question-mark-circle',
              parentId: '2b57c3a7-ae21-4fbc-bdb0-3f64278c5b19',
              type: 'group',
              children: [
                {
                  id: '97a572f0-de9e-478b-ab03-f64e55dfe538',
                  label: 'sql_insert',
                  icon: 'heroicons_outline:question-mark-circle',
                  parentId: '0ec93a0a-3273-42a2-ba5a-7168dcd46139',
                  data: {
                    hosts: [''],
                    table: 'rupay_raw_file_data',
                    driver: 'mysql',
                    schema: 'settlement',
                    password: '',
                    username: '',
                    columns_field_mapping: {
                      mti: 'nMTI',
                      file_type: '01',
                      record_data: 'content',
                      function_code: 'nFunCd',
                      record_number: 'record_number',
                    },
                  },
                  type: 'single',
                },
                {
                  id: 'd144948a-f085-409f-bdf1-8fd6825e2ccd',
                  label: 'update_run_status',
                  icon: 'heroicons_outline:question-mark-circle',
                  parentId: '0ec93a0a-3273-42a2-ba5a-7168dcd46139',
                  data: {
                    hosts: 'localhost',
                    driver: 'mysql',
                    schema: 'integrator',
                    password: 'password',
                    username: 'root',
                  },
                  type: 'single',
                },
              ],
            },
          ],
        },
      ],
    },
    processes: [
      {
        id: '791a6c84-4b09-483a-8f3f-03c893b9d02f',
        label: 'xml_parser',
        icon: 'heroicons_outline:question-mark-circle',
        data: {},
        type: 'single',
      },
      {
        id: 'ec015cd1-0894-4384-adb3-b26327c40853',
        label: 'json_schema',
        icon: 'heroicons_outline:question-mark-circle',
        data: {
          schema_id: '',
        },
        type: 'single',
      },
      {
        id: 'f587de6c-35cb-47cf-9170-17f2d87fd8ea',
        label: 'sequential',
        icon: 'heroicons_outline:question-mark-circle',
        type: 'group',
        children: [
          {
            id: 'b0e3a263-6808-4ae6-bfbf-69b4e4c5fc96',
            label: 'xml_parser',
            icon: 'heroicons_outline:question-mark-circle',
            parentId: 'f587de6c-35cb-47cf-9170-17f2d87fd8ea',
            data: {},
            type: 'single',
          },
          {
            id: 'e690fde8-2299-4b4f-b800-570db5b782f4',
            label: 'json_schema',
            icon: 'heroicons_outline:question-mark-circle',
            parentId: 'f587de6c-35cb-47cf-9170-17f2d87fd8ea',
            data: {
              schema_id: '',
            },
            type: 'single',
          },
        ],
      },
      {
        id: '9081a1a5-9259-40f8-9654-9c607362782e',
        label: 'switch',
        icon: 'heroicons_outline:question-mark-circle',
        type: 'tree',
        children: [
          {
            id: '67d0070b-1ce4-4b5c-9c0f-54f96a489f41',
            label: 'condition',
            icon: 'heroicons_outline:question-mark-circle',
            parentId: '9081a1a5-9259-40f8-9654-9c607362782e',
            data: 'errored()',
            type: 'single',
          },
          {
            id: '40825ee9-6971-48d4-bbfd-8dfc348bf4d4',
            label: 'condition',
            icon: 'heroicons_outline:question-mark-circle',
            parentId: '9081a1a5-9259-40f8-9654-9c607362782e',
            data: '!errored()',
            type: 'single',
          },
        ],
      },
    ],
  };
}
