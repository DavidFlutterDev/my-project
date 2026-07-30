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
import { HttpServerprocessorService } from './httpserverprocessor.service';
import { FormsModule } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_33ValidationSuite } from './httpserverprocessor.validations';
import {
  ClInputComponent,
  ClRadioComponent,
  ClLabelComponent,
  ClButtonComponent,
  ClIconComponent,
  ClMultiselectComponent,
} from '@clay/ui-components/basic';
import {
  ClAccordionComponent,
  ClExpansionPanelComponent,
  ClExpansionPanelHeaderComponent,
  ClExpansionPanelContentComponent,
  ClCardComponent,
} from '@clay/ui-components/containers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpServerData } from './httpserver.model';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-httpserverprocessor',
  styleUrl: './httpserverprocessor.component.scss',
  templateUrl: './httpserverprocessor.component.html',
  imports: [
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    ClRadioComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClCardComponent,
    ClIconComponent,
    ClMultiselectComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [HttpServerprocessorService],
})
export class HttpServerprocessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) {}

  protected httpServerprocessorService: HttpServerprocessorService = inject(
    HttpServerprocessorService,
  );

  ngOnInit(): void {
    this.form_33FormValue = this.httpServerprocessorService.form_33FormValue;
    if (this.node.data) {
      this.setEditFormData(this.node.data);
    }
    this.httpServerprocessorService.saveProperties.onSubmit =
      this.emitFormData.bind(this);
  }

  ngDoCheck() {
    this.httpServerprocessorService.saveProperties.disabled = !(
      this.form_33FormValid() && this.isMappingValid()
    );
  }

  isMappingValid(): boolean {
    for (const header of this.httpServerprocessorService.headers) {
      if (
        (header.key === '' || header.value === '') &&
        !(header.key === '' && header.value === '')
      ) {
        return false;
      }
    }

    return true;
  }

  protected form_33FormValue!: WritableSignal<any>;
  protected readonly form_33Suite = createform_33ValidationSuite;
  protected readonly form_33FormValid = signal<boolean>(false);
  protected readonly form_33Errors = signal<Record<string, string>>({});
  private readonly form_33ViewModel = computed(() => {
    return {
      errors: this.form_33Errors(),
      formValid: this.form_33FormValid(),
      formValue: this.form_33FormValue(),
    };
  });

  protected get form_33Vm() {
    return this.form_33ViewModel();
  }

  private refreshform_33FormValue() {
    this.setform_33FormValue(this.form_33FormValue());
  }

  protected setform_33FormValue(v: any) {
    this.form_33FormValue.set(v);
  }

  setEditFormData(data: any) {
    this.httpServerprocessorService.headers =
      data.sync_response?.headers &&
      Object.keys(data.sync_response.headers).length > 0
        ? this.convertToFormArray(data.sync_response.headers)
        : [];

    this.httpServerprocessorService.metadata_headers = data?.sync_response
      ?.metadata_headers ?? {
      include_prefixes: [],
      include_patterns: [],
    };

    this.httpServerprocessorService.allowedOrigins =
      data?.cors?.allowed_origins ?? [];

    const formValues = {
      // address: data.address,
      path: data.path,
      allowed_verbs: data.allowed_verbs,
      timeout: data.timeout,
      rate_limit: '',
      cors_enabled: data.cors?.enabled ?? true,
      // sync_response_status: data.sync_response?.status
    };
    this.form_33FormValue.set(formValues);
  }

  emitFormData() {
    const metadata_headers = {
      include_prefixes: this.httpServerprocessorService.metadata_headers.include_prefixes.filter(
        (str: any) => str !== '',
      ),
      include_patterns:
        this.httpServerprocessorService.metadata_headers.include_patterns.filter(
          (str: any) => str !== '',
        ),
    };
    const httpServerData: HttpServerData = {
      // address: this.form_33FormValue().address,
      path: this.form_33FormValue().path,
      allowed_verbs: this.form_33FormValue().allowed_verbs,
      timeout: this.form_33FormValue().timeout,
      rate_limit: '',
      cors: {
        enabled: this.form_33FormValue().cors_enabled,
        allowed_origins: this.httpServerprocessorService.allowedOrigins,
      },

      sync_response: {
        // status: this.form_33FormValue().sync_response_status,
        headers: this.convertToJsonObject(
          this.httpServerprocessorService.headers.filter(
            (str: any) => str.key !== '' && str.value !== '',
          ),
        ),
        metadata_headers: metadata_headers,
      },
    };
    this.node.isDataValid = true;
    this.onSubmitClicked(httpServerData);
  }

  onSubmitClicked(event: any) {}

  onHeaderKeyChange(value: string, index: number) {
    this.httpServerprocessorService.headers[index].key = value;
    this.refreshform_33FormValue();
  }

  onHeaderValueChange(value: string, index: number) {
    this.httpServerprocessorService.headers[index].value = value;
    this.refreshform_33FormValue();
  }

  onDeleteHeaders(index: number) {
    // show confirmation

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `header with name \"${this.httpServerprocessorService.headers[index].key}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpServerprocessorService.headers.splice(index, 1);
        this.refreshform_33FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  allowedOriginChange(value: string, index: number) {
    this.httpServerprocessorService.allowedOrigins[index] = value;
    this.refreshform_33FormValue();
  }

  ondeleteAllowedOrigins(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `Origin \"${this.httpServerprocessorService.allowedOrigins[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpServerprocessorService.allowedOrigins.splice(index, 1);
        this.refreshform_33FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  metadataPatternChange(value: string, index: number) {
    this.httpServerprocessorService.metadata_headers.include_patterns[index] =
      value;
    this.refreshform_33FormValue();
  }

  onDeleteMetaDataPattern(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `pattern \"${this.httpServerprocessorService.metadata_headers.include_patterns[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpServerprocessorService.metadata_headers.include_patterns.splice(
          index,
          1,
        );
        this.refreshform_33FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  metadataPrefixChange(value: string, index: number) {
    this.httpServerprocessorService.metadata_headers.include_prefixes[index] =
      value;
    this.refreshform_33FormValue();
  }

  onDeleteMetaDataPrefix(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        itemName: `pattern \"${this.httpServerprocessorService.metadata_headers.include_prefixes[index]}\"`,
      }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpServerprocessorService.metadata_headers.include_prefixes.splice(
          index,
          1,
        );
        this.refreshform_33FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  convertToFormArray(obj: any): any[] {
    if (obj) {
      return Object.keys(obj).map((key) => ({
        key: key,
        value: obj[key],
      }));
    } else {
      return [{ key: '', value: '' }];
    }
  }

  convertToJsonObject(arr: any): any {
    return arr.reduce((acc: { [x: string]: any }, { key, value }: any) => {
      acc[key] = value;
      return acc;
    }, {});
  }
}
