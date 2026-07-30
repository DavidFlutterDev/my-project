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
import { SftpProcessorService } from './sftpprocessor.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import {
  createform_31ValidationSuite,
  createform_32ValidationSuite,
} from './sftpprocessor.validations';
import {
  ClInputComponent,
  ClSelectComponent,
  ClLabelComponent,
  ClButtonComponent,
  ClRadioComponent,
} from '@clay/ui-components/basic';
import {
  ClAccordionComponent,
  ClExpansionPanelComponent,
  ClExpansionPanelHeaderComponent,
  ClExpansionPanelContentComponent,
} from '@clay/ui-components/containers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-sftpprocessor',
  styleUrl: './sftpprocessor.component.scss',
  templateUrl: './sftpprocessor.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClSelectComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClRadioComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [SftpProcessorService],
})
export class SftpProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected sftpProcessorService: SftpProcessorService =
    inject(SftpProcessorService);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form_31FormValue = this.sftpProcessorService.form_31FormValue;
    if (this.node.data) {
      if (this.node.category === 'Input' && this.node.data.paths) {
        this.sftpProcessorService.pathList = cloneDeep(
          this.node.data.paths,
        ) ?? [''];
      }
      this.form_31FormValue.set(this.node.data);
    }
    this.refreshform_31FormValue();

    this.sftpProcessorService.saveButtonProperties.onSubmit =
      this.emitFormData.bind(this);

    this.sftpProcessorService.pathListChange.subscribe((val) => {
      this.refreshform_31FormValue();
    });
  }

  ngDoCheck() {
    this.sftpProcessorService.saveButtonProperties.disabled = !(
      this.form_31FormValid() &&
      this.form_32FormValid() &&
      this.isMappingValid()
    );
  }

  isMappingValid(): boolean {
    var isMappingValid = true;
    if (this.node.category === 'Input') {
      isMappingValid =
        this.sftpProcessorService.pathList.filter((val: any) => val === '')
          ?.length === 0;
    }
    return isMappingValid;
  }

  protected form_31FormValue!: WritableSignal<any>;

  protected readonly form_31Suite = createform_31ValidationSuite;
  protected readonly form_32Suite = createform_32ValidationSuite;
  // protected readonly form_33Suite = staticSuite((model: any, field: string) => { });

  protected readonly form_31FormValid = signal<boolean>(false);
  protected readonly form_32FormValid = signal<boolean>(false);

  protected readonly form_31Errors = signal<Record<string, string>>({});
  private readonly form_31ViewModel = computed(() => {
    return {
      errors: this.form_31Errors(),
      formValid: this.form_31FormValid(),
      formValue: this.form_31FormValue(),
    };
  });

  protected get form_31Vm() {
    return this.form_31ViewModel();
  }

  private refreshform_31FormValue() {
    this.setform_31FormValue(this.form_31FormValue());
  }

  protected setform_31FormValue(v: any) {
    v.paths = this.sftpProcessorService.pathList;


    this.form_31FormValue.set({
      ...v,
      credentials: this.form_31FormValue().credentials,
    });
  }

  protected setform_32FormValue(v: any) {
    this.form_31FormValue.set({ ...this.form_31FormValue(), credentials: v });
  }

  // protected setform_33FormValue(v: any) {
  //   this.form_31FormValue.set({ ...this.form_31FormValue(), watcher: v });
  // }

  pathValueChange(value: any, index: number) {
    this.sftpProcessorService.pathList[index] = value;
    this.refreshform_31FormValue();
  }

  onDeletePath(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `path \"${this.sftpProcessorService.pathList[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.sftpProcessorService.pathList.splice(index, 1);
        this.refreshform_31FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  emitFormData() {
    console.log(70, this.form_31FormValue());
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_31FormValue());
  }

  onSubmitClicked(event: any) {}
}
