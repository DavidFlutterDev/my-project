import { inject, Component, signal, WritableSignal, computed, OnInit, Input, Output, EventEmitter, DoCheck } from "@angular/core";
import { SetConfigProcessorService } from "./setconfigprocessor.service";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { ClLabelComponent, ClButtonComponent } from "@clay/ui-components/basic";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { staticSuite } from "vest";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";

@Component({
  standalone: true,
  selector: 'app-setconfigprocessor',
  styleUrl: './setconfigprocessor.component.scss',
  templateUrl: './setconfigprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClLabelComponent, ClButtonComponent,
    MatFormFieldModule, MatIconModule, MatInputModule],
  providers: [SetConfigProcessorService],
})
export class SetConfigProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected setConfigProcessorService: SetConfigProcessorService = inject(SetConfigProcessorService);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form_4FormValue = this.setConfigProcessorService.form_4FormValue;
    if (this.node.data) {
      this.setConfigProcessorService.configs = this.convertToFormArray(this.node.data.configs);
    }
    this.refreshform_4FormValue();

    this.setConfigProcessorService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);

    this.setConfigProcessorService.dynamicFieldsChange.subscribe(val => {
      this.refreshform_4FormValue();
    });
  }

  ngDoCheck() {
    this.setConfigProcessorService.saveButtonProperties.disabled = !this.form_4FormValid();
  }

  protected form_4FormValue!: WritableSignal<any>;
  protected readonly form_4Suite = staticSuite((model: any, field: string) => { });
  protected readonly form_4FormValid = signal<boolean>(false);
  protected readonly form_4Errors = signal<Record<string, string>>({});
  private readonly form_4ViewModel = computed(() => {
    return {
      errors: this.form_4Errors(),
      formValid: this.form_4FormValid(),
      formValue: this.form_4FormValue(),
    }
  });

  protected get form_4Vm() {
    return this.form_4ViewModel();
  }

  private refreshform_4FormValue() {
    this.setform_4FormValue(this.form_4FormValue());
  }

  protected setform_4FormValue(v: any) {
    v.configs = this.convertToJsonObject(this.setConfigProcessorService.configs);

    setTimeout(() => {
      let isHeadersValid = false;
      isHeadersValid = this.setConfigProcessorService.configs.filter((val: any) => {
        return val.key === '' || val.value === ''
      })?.length === 0;
      this.form_4FormValid.set(isHeadersValid);
    });
    this.form_4FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_4FormValue());
  }

  onSubmitClicked(event: any) { }

  onConfigKeyChange(value: string, index: number) {
    this.setConfigProcessorService.configs[index].key = value;
    this.refreshform_4FormValue();
  }

  onConfigValueChange(value: string, index: number) {
    this.setConfigProcessorService.configs[index].value = value;
    this.refreshform_4FormValue();
  }

  onDeleteConfig(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `config with key \"${this.setConfigProcessorService.configs[index].key}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.setConfigProcessorService.configs.splice(index, 1);
        this.refreshform_4FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (obj) {
      return Object.keys(obj).map(key => ({
        key: key,
        value: obj[key]
      }))
    }
    return [{ key: '', value: '' }];
  }

  convertToJsonObject(arr: any): any {
    return arr.reduce((acc: { [x: string]: any; }, { key, value }: any) => {
      acc[key] = value;
      return acc;
    }, {});
  }
}
