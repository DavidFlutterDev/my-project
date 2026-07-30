import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
  WritableSignal,
  AfterViewInit,
} from '@angular/core';
import { AddpipelinetemplategeneratorService } from './add-pipeline-template-generator.service';
import {
  ClCardComponent,
  ClCardProperties,
} from '@clay/ui-components/containers';
import { Suite, create, enforce, staticSuite, test } from 'vest';
import {
  FormGroup,
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  validateShape,
  FormDirective,
  FormModelDirective,
  FormModelGroupDirective,
} from '@clay/ui-components/form-validations';
import {
  TemplatesDataModel,
  templatesdatamodelShape,
} from '../../models/templatesdatamodel';
import {
  ClInputComponent,
  ClInputProperties,
  ClButtonComponent,
  ClButtonProperties,
  ClRadioProperties,
  ClRadioComponent,
} from '@clay/ui-components/basic';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { Router } from '@angular/router';
import { RoutingVariables } from '../../utils/routing.variables';
import { ApiVariables } from '../../utils/api.variables';
import { GlobalVariables } from '../../utils/global.variables';
import { CommonToastService } from '../common-services/common-toast.services';
import { BreadcrumbComponent } from '../../templates/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-add-pipeline-template-generator',
  styleUrl: './add-pipeline-template-generator.component.scss',
  templateUrl: './add-pipeline-template-generator.component.html',
  imports: [
    FormsModule,
    FormDirective,
    ClCardComponent,
    ClInputComponent,
    ClButtonComponent,
    FormModelDirective,
    ReactiveFormsModule,
    FormModelGroupDirective,
    BreadcrumbComponent,
    ClRadioComponent,
  ],
  providers: [AddpipelinetemplategeneratorService, CommonToastService],
})
export class AddpipelinetemplategeneratorComponent
  implements OnInit, AfterViewInit
{
  private templateId: any;
  constructor(
    private fb: FormBuilder,
    private commonToastService: CommonToastService,
    private apiClient: ApiClient,
    private router: Router,
  ) {
    this.checkforPageArguments();
    this.form_7FormGroup = this.fb.group({});
    this.form_13FormGroup = this.fb.group({});
  }
  ngAfterViewInit(): void {}

  protected addpipelinetemplategeneratorService: AddpipelinetemplategeneratorService =
    inject(AddpipelinetemplategeneratorService);
  protected card0Properties!: ClCardProperties;
  public readonly form_7Valid = signal<boolean>(false);
  public readonly form_13Valid = signal<boolean>(false);

  ngOnInit(): void {
    this.card0Properties =
      this.addpipelinetemplategeneratorService.card0Properties;

    this.nameProperties =
      this.addpipelinetemplategeneratorService.nameProperties;

    this.typeProperties =
      this.addpipelinetemplategeneratorService.typeProperties;

    this.structureProperties =
      this.addpipelinetemplategeneratorService.structureProperties;

    this.saveButtonProperties =
      this.addpipelinetemplategeneratorService.saveButtonProperties;
  }

  checkforPageArguments() {
    var recievedData = JSON.stringify(
      this.router.getCurrentNavigation()?.extras.state,
    );
    if (recievedData != undefined && recievedData != null) {
      var parsedRecievedData =
        recievedData != null && recievedData != undefined
          ? JSON.parse(recievedData)
          : { data: '' };
      this.templateId = parsedRecievedData.id;
      console.log('templateId from list screen', this.templateId);
      this.getTemplateDetails();
    } else {
      this.form_7FormValue.set({
        type: 'Online',
      });
      console.log('null');
    }
  }

  protected readonly form_7FormValue = signal<TemplatesDataModel>({});
  protected readonly form_7Suite = staticSuite(
    (model: TemplatesDataModel, field: string) => {
      test('templatename', 'Pipeline template name is required', () => {
        enforce(model.templatename).isNotBlank();
      });

      test(
        'templatename',
        'Pipeline template name  must be between 1 and 100 characters',
        () => {
          const templatename = model.templatename || '';
          if (templatename.length < 1) {
            enforce(false).equals(
              true,
              'Pipeline template name must be at least 1 characters long.',
            );
          } else if (templatename.length > 100) {
            enforce(false).equals(
              true,
              'Pipeline template name must be at most 100 characters long.',
            );
          }
        },
      );
    },
  );
  public form_7FormGroup!: FormGroup;
  private readonly form_7ViewModel = computed(() => {
    return {
      formValue: this.form_7FormValue(),
    };
  });

  protected get form_7Vm() {
    return this.form_7ViewModel();
  }

  protected setform_7FormValue(v: any) {
    this.form_7FormValue.set(v);
    this.addpipelinetemplategeneratorService.nameFormValue = v;
    validateShape(v, templatesdatamodelShape);
    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected validateAll() {
    console.log('form 7', this.form_7Valid());
    console.log('form 13', this.form_13Valid());
    if (this.form_7Valid() && this.form_13Valid()) {
      this.addpipelinetemplategeneratorService.saveButtonDisabled.set(false);
    } else {
      this.addpipelinetemplategeneratorService.saveButtonDisabled.set(true);
    }
  }

  protected onform_7FormSubmit() {
    console.log(this.form_7ViewModel().formValue);
  }

  protected nameProperties!: ClInputProperties;
  protected typeProperties!: ClRadioProperties;
  protected readonly form_13FormValue = signal<TemplatesDataModel>({});
  public jsonFormValueError: any;
  protected readonly form_13Suite = staticSuite(
    (model: TemplatesDataModel, field: string) => {
      test('templatestructure', 'Json code is required', () => {
        const templatestructure = model.templatestructure || '';
        if (model.templatestructure == undefined) {
          // console.log('undef');
          this.jsonFormValueError = '';
          enforce(false).equals(true, '');
        } else if (templatestructure == '') {
          this.jsonFormValueError = 'Json code is required';
          console.log(this.jsonFormValueError);
          enforce(false).equals(true, 'Json code is required');
        } else if (!this.jsonValidator(templatestructure)) {
          this.jsonFormValueError = 'Invalid json code ';
          console.log('invalid', this.jsonFormValueError);
          enforce(false).equals(true, 'Inavalid json code');
        } else {
          this.jsonFormValueError = null;
        }
      });
    },
  );

  jsonValidator(control: any) {
    try {
      JSON.parse(control);
      console.log('try');
      return true; // valid JSON
    } catch (error) {
      console.log('try catch');
      return false; // invalid JSON
    }
  }
  public form_13FormGroup!: FormGroup;
  private readonly form_13ViewModel = computed(() => {
    return {
      formValue: this.form_13FormValue(),
    };
  });

  protected get form_13Vm() {
    return this.form_13ViewModel();
  }

  protected setform_13FormValue(v: any) {
    this.form_13FormValue.set(v);
    // console.log("json:" , v);
    this.addpipelinetemplategeneratorService.jsonFormValue = v;
    validateShape(v, templatesdatamodelShape);
    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected onform_13FormSubmit() {
    console.log(this.form_13ViewModel().formValue);
  }

  protected structureProperties!: ClInputProperties;
  protected saveButtonProperties!: ClButtonProperties;

  public saveTemplate() {
    console.log('saveTemp');

    var body = {
      tenantCode: GlobalVariables.tenantCode,
      templateName:
        this.addpipelinetemplategeneratorService.nameFormValue.templatename,
      type: this.addpipelinetemplategeneratorService.nameFormValue.type,
      structure: JSON.parse(
        this.addpipelinetemplategeneratorService.jsonFormValue
          .templatestructure,
      ),
    };
    console.log(body);
    if (this.templateId != null) {
      (body as any)['templatesId'] = this.templateId;
    }
    this.addpipelinetemplategeneratorService.saveButtonDisabled.set(true);
    this.apiClient
      .saveDataApi(ApiVariables.template_url, body, this.templateId)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.addpipelinetemplategeneratorService.saveButtonDisabled.set(
              false,
            );
            this.commonToastService.showSuccessToast(
              `Pipeline template ${this.addpipelinetemplategeneratorService.nameFormValue.templatename} has been updated and saved successfully.`,
            );
            this.router.navigate([RoutingVariables.pipelineTemplateListRoute]);
          } else {
            this.addpipelinetemplategeneratorService.saveButtonDisabled.set(
              false,
            );
            var jsonKeys = Object.keys(data.detail);

            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          this.addpipelinetemplategeneratorService.saveButtonDisabled.set(
            false,
          );
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  updateBreadcrumb(name: string) {
    this.addpipelinetemplategeneratorService.breadcrumbData[1].label = name;
    this.addpipelinetemplategeneratorService.breadcrumbData.push({
      label: 'Edit',
    });
  }

  public getTemplateDetails() {
    this.apiClient
      .getDetailsApi(ApiVariables.template_url, this.templateId)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            if (data.detail != null) {
              this.updateBreadcrumb(data.detail.templateName),
                this.form_7FormValue.set({
                  templatename: data.detail.templateName,
                  type: data.detail.type,
                });
              // this.form_7FormValue.set({
              // });
              this.form_13FormValue.set({
                templatestructure: JSON.stringify(
                  data.detail.structure,
                  null,
                  2,
                ),
              });
            }
          } else {
            var jsonKeys = Object.keys(data.detail);
            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }
}
