import {
  inject,
  Component,
  signal,
  WritableSignal,
  computed,
  OnInit,
  Input,
} from '@angular/core';
import { AwsS3ProcessorService } from './awss3processor.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_1ValidationSuite } from './awss3processor.validations';
import {
  ClInputComponent,
  ClLabelComponent,
  ClButtonComponent,
  ClRadioComponent,
  ClSelectComponent,
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { cloneDeep } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-awss3processor',
  styleUrl: './awss3processor.component.scss',
  templateUrl: './awss3processor.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    ClRadioComponent,
    ClSelectComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [AwsS3ProcessorService],
})
export class AwsS3ProcessorComponent implements OnInit {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) {}

  protected awsS3ProcessorService: AwsS3ProcessorService = inject(
    AwsS3ProcessorService,
  );

  ngOnInit(): void {
    this.form_1FormValue = this.awsS3ProcessorService.form_1FormValue;

    if (this.node.data) {
      if (this.node.category === 'Output') {
        this.awsS3ProcessorService.exclude_prefixes =
          cloneDeep(this.node.data.metadata?.exclude_prefixes) ?? [];
      }
      this.form_1FormValue.set(cloneDeep(this.node.data));
    }
    this.awsS3ProcessorService.saveProperties.onSubmit =
      this.emitFormData.bind(this);
  }

  ngDoCheck() {
    this.awsS3ProcessorService.saveProperties.disabled =
      !this.form_1FormValid();
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

  protected setform_1FormValue(v: any) {
    if (
      this.node.category === 'Output' &&
      this.awsS3ProcessorService.exclude_prefixes.length > 0
    ) {
      v.metadata = {
        exclude_prefixes: this.awsS3ProcessorService.exclude_prefixes.filter(
          (str) => str != '',
        ),
      };
    }
    this.form_1FormValue.set(v);
  }

  excludePrefixesChange(value: any, index: number) {
    this.awsS3ProcessorService.exclude_prefixes[index] = value;
    this.setform_1FormValue(this.form_1FormValue());
  }

  onDeleteExcludePrefix(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `prefix \"${this.awsS3ProcessorService.exclude_prefixes[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.awsS3ProcessorService.exclude_prefixes.splice(index, 1);
        this.setform_1FormValue(this.form_1FormValue());
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_1FormValue());
  }

  onSubmitClicked(event: any) {}
}
