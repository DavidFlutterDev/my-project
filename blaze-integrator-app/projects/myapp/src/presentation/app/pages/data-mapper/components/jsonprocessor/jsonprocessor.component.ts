import { inject, Component, signal, WritableSignal, computed, OnInit, Input, DoCheck } from "@angular/core";
import { JsonProcessorService } from "./jsonprocessor.service";
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
  selector: 'app-jsonprocessor',
  styleUrl: './jsonprocessor.component.scss',
  templateUrl: './jsonprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClLabelComponent, MatFormFieldModule,
    MatInputModule, ClButtonComponent, MatIconModule],
  providers: [JsonProcessorService],
})
export class JsonProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) { }

  protected jsonProcessorService: JsonProcessorService = inject(JsonProcessorService);

  ngOnInit(): void {
    this.jsonProcessorService.node = this.node;
    this.form_2FormValue = this.jsonProcessorService.form_2FormValue;

    if (this.node.label === 'fixed_position_parser') {
      this.jsonProcessorService.mappingArray = [{ key: '', length: '' }];
    }

    if (this.node.data && this.node.data.mapping) {
      this.jsonProcessorService.mappingArray = this.convertToFormArray(this.node.data.mapping);
    }

    this.refreshform_2FormValue();
    this.jsonProcessorService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);

    this.jsonProcessorService.mappingArrayChange.subscribe(val => {
      this.refreshform_2FormValue();
    });
  }

  ngDoCheck() {
    this.jsonProcessorService.saveButtonProperties.disabled = !this.form_2FormValid();
  }

  protected form_2FormValue!: WritableSignal<any>;
  protected readonly form_2Suite = staticSuite((model: any, field: string) => { });
  protected readonly form_2FormValid = signal<boolean>(false);
  protected readonly form_2Errors = signal<Record<string, string>>({});
  private readonly form_2ViewModel = computed(() => {
    return {
      errors: this.form_2Errors(),
      formValid: this.form_2FormValid(),
      formValue: this.form_2FormValue(),
    }
  });

  protected get form_2Vm() {
    return this.form_2ViewModel();
  }

  private refreshform_2FormValue() {
    this.setform_2FormValue(this.form_2FormValue());
  }

  protected setform_2FormValue(v: any) {
    v.mapping = this.convertToJsonObject(this.jsonProcessorService.mappingArray);

    setTimeout(() => {
      let isMappingValid = false;
      if (this.node.label === 'fixed_position_parser') {
        isMappingValid = this.jsonProcessorService.mappingArray.filter((val: any) => { return val.key === '' || val.length === '' })?.length === 0;
      } else {
        isMappingValid = this.jsonProcessorService.mappingArray.filter((val: any) => { return val.key === '' || val.field === '' })?.length === 0;
      }
      this.form_2FormValid.set(isMappingValid);
    });
    this.form_2FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_2FormValue());
  }

  onSubmitClicked(event: any) { }

  onKeyValueChange(value: string, index: number) {
    this.jsonProcessorService.mappingArray[index].key = value;
    this.refreshform_2FormValue();
  }

  onFieldValueChange(value: string, index: number) {
    this.jsonProcessorService.mappingArray[index].field = value;
    this.refreshform_2FormValue();
  }


  onLengthValueChange(value: string, index: number) {
    this.jsonProcessorService.mappingArray[index].length = value;
    this.refreshform_2FormValue();
  }


  onDeleteMapping(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `mapping with field \"${this.jsonProcessorService.mappingArray[index].field}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.jsonProcessorService.mappingArray.splice(index, 1);
        this.refreshform_2FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (this.node.label === 'fixed_position_parser') {
      if (obj) {
        return Object.keys(obj).map(key => ({
          key: key,
          length: obj[key]
        }))
      } else {
        return [{ key: '', length: '' }];
      }
    } else {
      if (obj) {
        return Object.keys(obj).map(key => ({
          key: key,
          field: obj[key]
        }))
      } else {
        return [{ key: '', field: '' }];
      }
    }
  }

  convertToJsonObject(arr: any): any {
    if (this.node.label === 'fixed_position_parser') {
      return arr.reduce((acc: { [x: string]: any; }, { key, length }: any) => {
        acc[key] = length;
        return acc;
      }, {});
    } else {
      return arr.reduce((acc: { [x: string]: any; }, { key, field }: any) => {
        acc[key] = field;
        return acc;
      }, {});
    }
  }
}
