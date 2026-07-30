import {
  inject,
  Component,
  signal,
  WritableSignal,
  computed,
  OnInit,
  Input,
  DoCheck,
} from '@angular/core';
import { EncryptProcessorsService } from './encryptprocessors.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_10ValidationSuite } from './encryptprocessors.validations';
import {
  ClSelectComponent,
  ClInputComponent,
  ClLabelComponent,
  ClButtonComponent,
} from '@clay/ui-components/basic';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-encryptprocessors',
  styleUrl: './encryptprocessors.component.scss',
  templateUrl: './encryptprocessors.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClSelectComponent,
    ClInputComponent,
    ClLabelComponent,
    ClButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
  providers: [EncryptProcessorsService],
})
export class EncryptProcessorsComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected encryptProcessorsService: EncryptProcessorsService = inject(
    EncryptProcessorsService,
  );

  constructor(public dialog: MatDialog) {}

  ngDoCheck() {
    this.encryptProcessorsService.saveButtonProperties.disabled = !(
      this.isMappingValid() && this.form_10FormValid()
    );
  }
  isMappingValid(): boolean {
    const isMappingValid =
      this.encryptProcessorsService.mappingList.filter((val: any) => val === '')
        ?.length === 0;
    return isMappingValid;
  }

  ngOnInit(): void {
    this.form_10Suite = createform_10ValidationSuite(this.node.label);
    this.form_10FormValue = this.encryptProcessorsService.form_10FormValue;

    if (this.node.data) {
      this.encryptProcessorsService.mappingList = cloneDeep(
        this.node.data.mapping,
      ) ?? [''];
      this.form_10FormValue.set(cloneDeep(this.node.data));
    }
    this.refreshForm_10FormValue();

    this.encryptProcessorsService.saveButtonProperties.onSubmit =
      this.emitFormData.bind(this);

    this.encryptProcessorsService.mappingListChange.subscribe((val) => {
      this.refreshForm_10FormValue();
    });
  }

  protected form_10FormValue!: WritableSignal<any>;
  protected form_10Suite: any;
  protected readonly form_10FormValid = signal<boolean>(false);
  protected readonly form_10Errors = signal<Record<string, string>>({});
  private readonly form_10ViewModel = computed(() => {
    return {
      errors: this.form_10Errors(),
      formValid: this.form_10FormValid(),
      formValue: this.form_10FormValue(),
    };
  });

  protected get form_10Vm() {
    return this.form_10ViewModel();
  }

  private refreshForm_10FormValue() {
    this.setform_10FormValue(this.form_10FormValue());
  }

  protected setform_10FormValue(v: any) {
    v.mapping = this.encryptProcessorsService.mappingList;
    this.form_10FormValue.set(v);
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_10FormValue());
  }

  onSubmitClicked(event: any) {}

  mappingValueChange(value: string, index: number) {
    this.encryptProcessorsService.mappingList[index] = value;
    this.refreshForm_10FormValue();
  }

  onDeleteMapping(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `mapping with name \"${this.encryptProcessorsService.mappingList[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.encryptProcessorsService.mappingList.splice(index, 1);
        this.refreshForm_10FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }
}
