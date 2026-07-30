import { inject, Component, signal, WritableSignal, computed, OnInit, Input,DoCheck } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { ClSelectComponent, ClButtonComponent } from "@clay/ui-components/basic";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { DataValidatorProcessorService } from "./datavalidatorprocessor.service";
import { createform_55ValidationSuite } from "./datavalidatorprocessor.validations";
import { ApiClient } from "projects/myapp/src/api/api.client.services";
import { ApiVariables } from "../../../../utils/api.variables";
import { CommonToastService } from "../../../common-services/common-toast.services";
import { GlobalVariables } from "../../../../utils/global.variables";

@Component({
  standalone: true,
  selector: 'app-datavalidatorprocessor',
  styleUrl: './datavalidatorprocessor.component.scss',
  templateUrl: './datavalidatorprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClSelectComponent,
    ClButtonComponent,
    MatFormFieldModule, MatIconModule, MatInputModule],
  providers: [DataValidatorProcessorService],
})
export class DataValidatorProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(private apiClient: ApiClient,
    private commonToastService: CommonToastService,) { }

  protected dataValidatorProcessorService: DataValidatorProcessorService = inject(DataValidatorProcessorService);

  ngOnInit(): void {
    this.getSchemaOptions();
    this.form_55FormValue = this.dataValidatorProcessorService.form_55FormValue;
    if (this.node.data) {
      this.form_55FormValue.set(this.node.data);
    }
    this.refreshform_55FormValue();

    this.dataValidatorProcessorService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);
  }

  ngDoCheck() {
    this.dataValidatorProcessorService.saveButtonProperties.disabled = !this.form_55FormValid();
  }

  protected form_55FormValue!: WritableSignal<any>;
  protected readonly form_55Suite = createform_55ValidationSuite;
  protected readonly form_55FormValid = signal<boolean>(false);
  protected readonly form_55Errors = signal<Record<string, string>>({});
  private readonly form_55ViewModel = computed(() => {
    return {
      errors: this.form_55Errors(),
      formValid: this.form_55FormValid(),
      formValue: this.form_55FormValue(),
    }
  });

  protected get form_55Vm() {
    return this.form_55ViewModel();
  }

  private refreshform_55FormValue() {
    this.setform_55FormValue(this.form_55FormValue());
  }

  protected setform_55FormValue(v: any) {
    this.form_55FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_55FormValue());
  }

  onSubmitClicked(event: any) { }

  getSchemaOptions() {
    const param = `tenantCode=${GlobalVariables.tenantCode}`;

    this.apiClient.getListapi(ApiVariables.validation_schema_url,)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {

            this.dataValidatorProcessorService.schemaSelectProperties.options = data.detail.content.map((obj: any) => ({
              text: obj.schemaName,
              value: obj.validationSchemasId
            }));

          } else {
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }
}
