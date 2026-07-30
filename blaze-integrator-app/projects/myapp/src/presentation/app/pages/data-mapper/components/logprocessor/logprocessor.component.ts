import {
  inject,
  Component,
  signal,
  WritableSignal,
  computed,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { LogProcessorService } from './logprocessor.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_54ValidationSuite } from './logprocessor.validations';
import {
  ClSelectComponent,
  ClInputComponent,
  ClLabelComponent,
  ClButtonComponent,
} from '@clay/ui-components/basic';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-logprocessor',
  styleUrl: './logprocessor.component.scss',
  templateUrl: './logprocessor.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClSelectComponent,
    ClInputComponent,
    ClLabelComponent,
    ClButtonComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [LogProcessorService],
})
export class LogProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) {}

  protected logProcessorService: LogProcessorService =
    inject(LogProcessorService);

  ngOnInit(): void {
    this.form_54FormValue = this.logProcessorService.form_54FormValue;

    if (this.node.data && this.node.data.mapping) {
      this.logProcessorService.mappingArray = this.convertToFormArray(
        this.node.data.mapping,
      );
      this.form_54FormValue.set(this.node.data);
    }
    this.refreshform_54FormValue();

    this.logProcessorService.saveButtonProperties.onSubmit =
      this.emitFormData.bind(this);

    this.logProcessorService.mappingArrayChange.subscribe((val) => {
      this.refreshform_54FormValue();
    });
  }
  ngDoCheck() {
    this.logProcessorService.saveButtonProperties.disabled =
      !(this.form_54FormValid() && this.isMappingValid());
  }

  isMappingValid(): boolean {
    for (var map of this.logProcessorService.mappingArray) {
      if (
        (map.key === '' || map.field === '') &&
        !(map.key === '' && map.field === '')
      ) {
        return false;
      }
    }
    return true;
  }

  protected form_54FormValue!: WritableSignal<any>;
  protected readonly form_54Suite = createform_54ValidationSuite;
  protected readonly form_54FormValid = signal<boolean>(false);
  protected readonly form_54Errors = signal<Record<string, string>>({});
  private readonly form_54ViewModel = computed(() => {
    return {
      errors: this.form_54Errors(),
      formValid: this.form_54FormValid(),
      formValue: this.form_54FormValue(),
    };
  });

  protected get form_54Vm() {
    return this.form_54ViewModel();
  }

  private refreshform_54FormValue() {
    this.setform_54FormValue(this.form_54FormValue());
  }

  protected setform_54FormValue(v: any) {
    v.mapping = this.convertToJsonObject(
      this.logProcessorService.mappingArray.filter(
        (map: any) => map.key !== '' && map.field != '',
      ),
    );
    this.form_54FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_54FormValue());
  }

  onSubmitClicked(event: any) {}

  onKeyValueChange(value: string, index: number) {
    this.logProcessorService.mappingArray[index].key = value;
    this.refreshform_54FormValue();
  }

  onFieldValueChange(value: string, index: number) {
    this.logProcessorService.mappingArray[index].field = value;
    this.refreshform_54FormValue();
  }

  onDeleteMapping(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `mapping with key \"${this.logProcessorService.mappingArray[index].key}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.logProcessorService.mappingArray.splice(index, 1);
        this.refreshform_54FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (obj) {
      return Object.keys(obj).map((key) => ({
        key: key,
        field: obj[key],
      }));
    } else {
      return [{ key: '', field: '' }];
    }
  }

  convertToJsonObject(arr: any): any {
    return arr.reduce((acc: { [x: string]: any }, { key, field }: any) => {
      acc[key] = field;
      return acc;
    }, {});
  }
}
