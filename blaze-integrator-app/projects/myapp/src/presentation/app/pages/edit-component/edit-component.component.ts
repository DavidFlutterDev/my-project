import { Component, inject, OnInit, signal, computed } from "@angular/core";
import { EditcomponentService } from "./edit-component.service";
import { ClCardComponent, ClCardProperties } from "@clay/ui-components/containers";
import { Suite, create, staticSuite } from "vest";
import { FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { validateShape, FormDirective } from "@clay/ui-components/form-validations";
import { ComponentsDataModel, componentsdatamodelShape } from "../../models/componentsdatamodel";
import { ClInputComponent, ClInputProperties, ClSelectComponent, ClSelectProperties, ClButtonComponent, ClButtonProperties } from "@clay/ui-components/basic";

@Component({
  standalone: true,
  selector: 'app-edit-component',
  styleUrl: './edit-component.component.scss',
  templateUrl: './edit-component.component.html',
  imports: [ClCardComponent, FormsModule, FormDirective, ClInputComponent, ClSelectComponent, ClButtonComponent,],
  providers: [EditcomponentService],
})
export class EditcomponentComponent implements OnInit {
  constructor(private fb: FormBuilder) {

    this.form_6FormGroup = this.fb.group({});
  }

  protected editcomponentService: EditcomponentService = inject(EditcomponentService);
  protected card0Properties!: ClCardProperties;

  ngOnInit(): void {
    this.card0Properties = this.editcomponentService.card0Properties;

    this.pipelineNameProperties = this.editcomponentService.pipelineNameProperties;

    this.templateProperties = this.editcomponentService.templateProperties;

    this.pipelineCardProperties = this.editcomponentService.pipelineCardProperties;

    this.proceedButtonProperties = this.editcomponentService.proceedButtonProperties;
  }

  protected readonly form_6FormValue = signal<ComponentsDataModel>({});
  protected readonly form_6Suite = staticSuite((model: ComponentsDataModel, field: string) => { });
  public form_6FormGroup!: FormGroup;
  private readonly form_6ViewModel = computed(() => {
    return {
      formValue: this.form_6FormValue(),
    }
  });

  protected get form_6Vm() {
    return this.form_6ViewModel();
  }

  protected setform_6FormValue(v: any) {
    this.form_6FormValue.set(v);
    validateShape(v, componentsdatamodelShape);
  }

  protected onform_6FormSubmit() {
    console.log(this.form_6ViewModel().formValue);
  }

  protected pipelineNameProperties!: ClInputProperties;
  protected templateProperties!: ClSelectProperties;
  protected pipelineCardProperties!: ClCardProperties;
  protected proceedButtonProperties!: ClButtonProperties;
}
