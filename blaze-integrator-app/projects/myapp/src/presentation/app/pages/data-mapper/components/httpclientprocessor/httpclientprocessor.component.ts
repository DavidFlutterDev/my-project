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
import { HttpClientProcessorService } from './httpclientprocessor.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_8ValidationSuite } from './httpclientprocessor.validations';
import {
  ClInputComponent,
  ClSelectComponent,
  ClRadioComponent,
  ClLabelComponent,
  ClButtonComponent,
} from '@clay/ui-components/basic';
import {
  ClAccordionComponent,
  ClExpansionPanelComponent,
  ClExpansionPanelHeaderComponent,
  ClExpansionPanelContentComponent,
} from '@clay/ui-components/containers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { staticSuite } from 'vest';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep, head } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-httpclientprocessor',
  styleUrl: './httpclientprocessor.component.scss',
  templateUrl: './httpclientprocessor.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClSelectComponent,
    ClRadioComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [HttpClientProcessorService],
})
export class HttpClientProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected httpClientProcessorService: HttpClientProcessorService = inject(
    HttpClientProcessorService,
  );

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form_8FormValue = this.httpClientProcessorService.form_8FormValue;
    if (this.node.data) {
      this.httpClientProcessorService.headers = this.convertToFormArray(
        this.node.data.headers,
      );
      if (this.node.category === 'Processor') {
        this.node.data.basic_auth = this.node.data.basic_auth ?? {
          enabled: false,
          username: '',
          password: '',
        };
        if (this.node.data.metadata?.include_patterns)
          this.httpClientProcessorService.metadataIncludePatterns = cloneDeep(
            this.node.data.metadata.include_patterns,
          );
        if (this.node.data.extract_headers?.include_patterns)
          this.httpClientProcessorService.extractHeaderIncludePatterns =
            cloneDeep(this.node.data.extract_headers.include_patterns);
        if (this.node.data.extract_headers?.include_prefixes)
          this.httpClientProcessorService.extractHeaderIncludePrefixes =
            cloneDeep(this.node.data.extract_headers.include_prefixes);
      }
      setTimeout(() => {
        this.form_8FormValue.set(cloneDeep(this.node.data));
      });
    }
    this.httpClientProcessorService.saveProperties.onSubmit =
      this.emitFormData.bind(this);

    this.httpClientProcessorService.dynamicFieldsChange.subscribe((val) => {
      this.refreshform_8FormValue();
    });
  }

  ngDoCheck() {
    this.httpClientProcessorService.saveProperties.disabled = !(
      this.form_8FormValid() && this.isMappingValid()
    );
  }

  isMappingValid(): boolean {
    for (const header of this.httpClientProcessorService.headers) {
      if (
        (header.header_name === '' || header.value === '') &&
        !(header.header_name === '' && header.value === '')
      ) {
        return false;
      }
    }

    return true;
  }

  protected form_8FormValue!: WritableSignal<any>;
  protected readonly form_8Suite = createform_8ValidationSuite;
  protected readonly form_9Suite = staticSuite(
    (model: any, field: string) => {},
  );
  protected readonly form_8FormValid = signal<boolean>(false);
  protected readonly form_8Errors = signal<Record<string, string>>({});
  private readonly form_8ViewModel = computed(() => {
    return {
      errors: this.form_8Errors(),
      formValid: this.form_8FormValid(),
      formValue: this.form_8FormValue(),
    };
  });

  protected get form_8Vm() {
    return this.form_8ViewModel();
  }

  private refreshform_8FormValue() {
    this.setform_8FormValue(this.form_8FormValue());
  }

  protected setform_8FormValue(v: any) {
    v.headers = this.convertToJsonObject(
      this.httpClientProcessorService.headers.filter(
        (str) => str.header_name !== '' && str.value !== '',
      ),
    );
    if (this.node.category === 'Processor') {
      v.metadata = {
        include_patterns:
          this.httpClientProcessorService.metadataIncludePatterns.filter(
            (str) => str !== '',
          ),
      };
      v.extract_headers = {
        include_patterns:
          this.httpClientProcessorService.extractHeaderIncludePatterns.filter(
            (str) => str !== '',
          ),
        include_prefixes:
          this.httpClientProcessorService.extractHeaderIncludePrefixes.filter(
            (str) => str !== '',
          ),
      };
    }
    this.form_8FormValue.set({
      ...v,
      basic_auth: this.form_8FormValue().basic_auth,
    });
  }

  protected setform_9FormValue(v: any) {
    this.form_8FormValue.set({ ...this.form_8FormValue(), basic_auth: v });
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_8FormValue());
  }

  onSubmitClicked(event: any) {}

  onHeaderNameChange(value: string, index: number) {
    this.httpClientProcessorService.headers[index].header_name = value;
    this.refreshform_8FormValue();
  }

  onHeaderValueChange(value: string, index: number) {
    this.httpClientProcessorService.headers[index].value = value;
    this.refreshform_8FormValue();
  }

  onDeleteHeaders(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `header with name \"${this.httpClientProcessorService.headers[index].header_name}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpClientProcessorService.headers.splice(index, 1);
        this.refreshform_8FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  metadataPatternChange(value: string, index: number) {
    this.httpClientProcessorService.metadataIncludePatterns[index] = value;
    this.refreshform_8FormValue();
  }

  onDeleteMetaDataPattern(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `pattern \"${this.httpClientProcessorService.metadataIncludePatterns[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpClientProcessorService.metadataIncludePatterns.splice(
          index,
          1,
        );
        this.refreshform_8FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  extractHeaderPatternChange(value: string, index: number) {
    this.httpClientProcessorService.extractHeaderIncludePatterns[index] = value;
    this.refreshform_8FormValue();
  }

  onDeleteExtractHeaderIncludePatterns(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `pattern \"${this.httpClientProcessorService.extractHeaderIncludePatterns[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpClientProcessorService.extractHeaderIncludePatterns.splice(
          index,
          1,
        );
        this.refreshform_8FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  extractHeaderPrefixChange(value: string, index: number) {
    this.httpClientProcessorService.extractHeaderIncludePrefixes[index] = value;
    this.refreshform_8FormValue();
  }

  onDeletExcHeaderPrefixes(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `prefix \"${this.httpClientProcessorService.extractHeaderIncludePrefixes[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpClientProcessorService.extractHeaderIncludePrefixes.splice(
          index,
          1,
        );
        this.refreshform_8FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (obj) {
      return Object.keys(obj).map((key) => ({
        header_name: key,
        value: obj[key],
      }));
    }
    return [];
  }

  convertToJsonObject(arr: any): any {
    return arr.reduce(
      (acc: { [x: string]: any }, { header_name, value }: any) => {
        acc[header_name] = value;

        return acc;
      },
      {},
    );
  }
}
