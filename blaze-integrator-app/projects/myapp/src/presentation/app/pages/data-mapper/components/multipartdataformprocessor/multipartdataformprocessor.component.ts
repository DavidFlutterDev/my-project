import { inject, Component, signal, WritableSignal, computed, OnInit, Input, DoCheck } from "@angular/core";
import { MultipartDataformProcessorService } from "./multipartdataformprocessor.service";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { ClLabelComponent, ClButtonComponent } from "@clay/ui-components/basic";
import { staticSuite } from "vest";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";
import { cloneDeep } from "lodash";

@Component({
  standalone: true,
  selector: 'app-multipartdataformprocessor',
  styleUrl: './multipartdataformprocessor.component.scss',
  templateUrl: './multipartdataformprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClLabelComponent, ClButtonComponent,
    MatFormFieldModule, MatIconModule, MatInputModule
  ],
  providers: [MultipartDataformProcessorService],
})
export class MultipartDataformProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected multipartDataformProcessorService: MultipartDataformProcessorService = inject(MultipartDataformProcessorService);

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {

    this.form_15FormValue = this.multipartDataformProcessorService.form_15FormValue;

    if (this.node.data) {
      this.multipartDataformProcessorService.fields = cloneDeep(this.node.data.fields) ?? [{name: '', contentType: '', data: ''}];
    }
    this.refreshform_15FormValue();

    this.multipartDataformProcessorService.button18Properties.onSubmit = this.emitFormData.bind(this);

    this.multipartDataformProcessorService.dynamicFieldsChange.subscribe(val => {
      this.refreshform_15FormValue();
    });
  }

  ngDoCheck() {
    this.multipartDataformProcessorService.button18Properties.disabled = !this.form_15FormValid();
  }


  protected form_15FormValue!: WritableSignal<any>;
  protected readonly form_15Suite = staticSuite((model: any, field: string) => {});
  protected readonly form_15FormValid = signal<boolean>(false);
  protected readonly form_15Errors = signal<Record<string, string>>({});
  private readonly form_15ViewModel = computed(() => {
    return {
      errors: this.form_15Errors(),
      formValid: this.form_15FormValid(),
      formValue: this.form_15FormValue(),
    }
  });

  protected get form_15Vm() {
    return this.form_15ViewModel();
  }

  private refreshform_15FormValue() {
    this.setform_15FormValue(this.form_15FormValue());
  }

  protected setform_15FormValue(v: any) {
    v.fields = this.multipartDataformProcessorService.fields;

    setTimeout(() => {
      let isFieldValid = false;
      isFieldValid = this.multipartDataformProcessorService.fields.filter((val: any) => {
        return val.name === '' || val.contentType === '' || val.data === ''
      })?.length === 0;
      this.form_15FormValid.set(isFieldValid);
    });
    this.form_15FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_15FormValue());
  }

  onSubmitClicked(event: any) { }

  onFieldNameChange(value: string, index: number) {
    this.multipartDataformProcessorService.fields[index].name = value;
    this.refreshform_15FormValue();
  }

  onFieldContentTypeChange(value: string, index: number) {
    this.multipartDataformProcessorService.fields[index].contentType = value;
    this.refreshform_15FormValue();
  }

  onFieldDataChange(value: string, index: number) {
    this.multipartDataformProcessorService.fields[index].data = value;
    this.refreshform_15FormValue();
  }

  onDeleteField(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `field config with name \"${this.multipartDataformProcessorService.fields[index].name}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.multipartDataformProcessorService.fields.splice(index, 1);
        this.refreshform_15FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }
}
