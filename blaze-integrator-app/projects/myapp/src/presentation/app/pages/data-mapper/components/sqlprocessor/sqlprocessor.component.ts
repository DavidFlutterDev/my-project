import {
  inject,
  Component,
  signal,
  WritableSignal,
  computed,
  OnInit,
  Input,
} from '@angular/core';
import { SqlProcessorService } from './sqlprocessor.service';
import {
  ClIconComponent,
  ClLabelComponent,
  ClInputComponent,
  ClButtonComponent,
  ClSelectComponent,
} from '@clay/ui-components/basic';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_1ValidationSuite } from './sqlprocessor.validations';
import {
  ClAccordionComponent,
  ClExpansionPanelComponent,
  ClExpansionPanelHeaderComponent,
  ClExpansionPanelContentComponent,
  ClCardComponent,
} from '@clay/ui-components/containers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { cloneDeep } from 'lodash';
import { MatSelectModule } from '@angular/material/select';
import { SqlProcessorFormModel } from './sqlprocessor.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-sqlprocessor',
  styleUrl: './sqlprocessor.component.scss',
  templateUrl: './sqlprocessor.component.html',
  imports: [
    ClIconComponent,
    ClLabelComponent,
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClButtonComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    ClCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ClSelectComponent,
  ],
  providers: [SqlProcessorService],
})
export class SqlProcessorComponent implements OnInit {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) { }

  protected sqlProcessorService: SqlProcessorService =
    inject(SqlProcessorService);

  ngOnInit(): void {
    this.form_1FormValue = this.sqlProcessorService.form_1FormValue;
    if (this.node.data) {
      if (this.node.label === 'sql_select') {
        this.sqlProcessorService.columnsArray =
          cloneDeep(this.node.data.columns) ?? [];
        if (this.node.data.where) {
          this.sqlProcessorService.whereConditionArray = cloneDeep(
            this.node.data.where,
          ) ?? [''];
        }
      } else if (this.node.label === 'sql_raw' || this.node.label === 'cassandra') {
        this.sqlProcessorService.argsMappingArray =
          cloneDeep(this.node.data.args_mapping) ?? [];
      } else if (this.node.label === 'sql_insert') {
        // TODO : this needs to be modified as required json
        this.sqlProcessorService.colFieldMappingArray =
          this.convertToFormArray(this.node.data.columns_field_mapping) ??
          this.sqlProcessorService.colFieldMappingArray;
      }
      this.form_1FormValue.set(this.node.data);
    }

    this.sqlProcessorService.saveButtonIdProperties.onSubmit =
      this.emitFormData.bind(this);

    this.sqlProcessorService.colMappingArrayChange.subscribe((val) => {
      this.refreshform__1FormValue();
    });
  }

  ngDoCheck() {
    this.sqlProcessorService.saveButtonIdProperties.disabled = !(
      this.form_1FormValid() && this.isMappingValid()
    );
  }

  isMappingValid(): boolean {
    var isValid = true;
    if (this.node.label === 'sql_select') {
      for (const where of this.sqlProcessorService.whereConditionArray) {
        if (
          (where.col === '' || where.operator === '' || where.value === '') &&
          !(where.col === '' && where.operator === '' && where.value === '')
        ) {
          isValid = false;
          break;
        }
      }
    } else if (this.node.label === 'sql_insert') {
      isValid = !!(
        this.sqlProcessorService.colFieldMappingArray &&
        this.sqlProcessorService.colFieldMappingArray.filter((val: any) => {
          return val.column === '' || val.field === '';
        })?.length === 0
      );
    }

    return isValid;
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

  private refreshform__1FormValue() {
    this.setform_1FormValue(this.form_1FormValue());
  }

  protected setform_1FormValue(v: SqlProcessorFormModel) {
    if (this.node.label === 'sql_select') {
      v.columns = this.sqlProcessorService.columnsArray.filter(
        (str) => str !== '',
      );

      v.where = this.sqlProcessorService.whereConditionArray.filter(
        (where: any) =>
          where.col !== '' && where.operator !== '' && where.value !== '',
      );
    } else if (this.node.label === 'sql_raw' || this.node.label === 'cassandra') {
      v.args_mapping = this.sqlProcessorService.argsMappingArray.filter(
        (str) => str != '',
      );
    } else if (this.node.label === 'sql_insert') {
      v.columns_field_mapping = this.convertToJsonObject(
        this.sqlProcessorService.colFieldMappingArray,
      );
    }
    this.form_1FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_1FormValue());
  }

  onSubmitClicked(event: any) {
    console.log(70, event);
  }

  columnValueChange(value: string, index: number) {
    this.sqlProcessorService.columnsArray[index] = cloneDeep(value);
    this.refreshform__1FormValue();
  }

  onDeleteColumn(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `column \"${this.sqlProcessorService.columnsArray[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.sqlProcessorService.columnsArray.splice(index, 1);
        this.refreshform__1FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  argMappingChange(value: string, index: number) {
    this.sqlProcessorService.argsMappingArray[index] = cloneDeep(value);
    this.refreshform__1FormValue();
  }

  onDeleteMapping(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `arg \"${this.sqlProcessorService.argsMappingArray[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.sqlProcessorService.argsMappingArray.splice(index, 1);
        this.refreshform__1FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  onConditionColChange(value: string, index: number) {
    this.sqlProcessorService.whereConditionArray[index].col = value;
    this.refreshform__1FormValue();
  }

  onConditionOperatorChange(event: any, index: number) {
    this.sqlProcessorService.whereConditionArray[index].operator = event.value;
    this.refreshform__1FormValue();
  }

  onConditionFieldChange(value: string, index: number) {
    this.sqlProcessorService.whereConditionArray[index].value = value;
    this.refreshform__1FormValue();
  }

  onDeleteCondition(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `condition for col \"${this.sqlProcessorService.whereConditionArray[index].col}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.sqlProcessorService.whereConditionArray.splice(index, 1);
        this.refreshform__1FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  onColMapColumnChange(value: any, index: number) {
    this.sqlProcessorService.colFieldMappingArray[index].column = value;
    this.refreshform__1FormValue();
  }

  onColMapFieldChange(value: string, index: number) {
    this.sqlProcessorService.colFieldMappingArray[index].field = value;
    this.refreshform__1FormValue();
  }

  onDeleteColFieldMapping(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `column field mapping with column \"${this.sqlProcessorService.colFieldMappingArray[index].column}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.sqlProcessorService.colFieldMappingArray.splice(index, 1);
        this.refreshform__1FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (obj) {
      return Object.keys(obj).map((key) => ({
        column: key,
        field: obj[key],
      }));
    } else {
      return [{ column: '', field: '' }];
    }
  }

  convertToJsonObject(arr: any): any {
    return arr.reduce((acc: { [x: string]: any }, { column, field }: any) => {
      acc[column] = field;
      return acc;
    }, {});
  }
}
