import { inject, Component, signal, WritableSignal, computed, OnInit, Input, DoCheck } from "@angular/core";
import { HttpControllerProcessorService } from "./httpcontrollerprocessor.service";
import { ClLabelComponent, ClButtonComponent } from "@clay/ui-components/basic";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { staticSuite } from "vest";
import { cloneDeep } from "lodash";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";

@Component({
  standalone: true,
  selector: 'app-httpcontrollerprocessor',
  styleUrl: './httpcontrollerprocessor.component.scss',
  templateUrl: './httpcontrollerprocessor.component.html',
  imports: [ClLabelComponent, vestForms, FormsModule, FormDirective, ClButtonComponent,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
  providers: [HttpControllerProcessorService],
})
export class HttpControllerProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog) { }

  protected httpControllerProcessorService: HttpControllerProcessorService = inject(HttpControllerProcessorService);

  ngOnInit(): void {
    this.form_2FormValue = this.httpControllerProcessorService.form_2FormValue;
    if(this.node.children?.length > 0) {
      this.httpControllerProcessorService.services = this.setEditData(this.node.children);
    }
    this.refreshform_2FormValue();

    this.httpControllerProcessorService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);

    this.httpControllerProcessorService.dynamicFieldsChange.subscribe(val => {
      this.refreshform_2FormValue();
    });
  }

  ngDoCheck() {
    this.httpControllerProcessorService.saveButtonProperties.disabled = !this.form_2FormValid();
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
    this.httpControllerProcessorService.conditions = cloneDeep(this.httpControllerProcessorService.services).map(
      (service: { id: string, path: string; http_method: string; }) => ({
        id: service.id,
        label: service.http_method  + service.path
      }));

    setTimeout(() => {
      const isMappingValid = this.httpControllerProcessorService.services.filter((val: any) => {
        return val.path === '' || val.http_method === '' })?.length === 0;

      this.form_2FormValid.set(isMappingValid);
    });

    this.form_2FormValue.set(v);
  }

  setEditData(childrenList: any[]): {id: string, path: string, http_method: string}[] {
    return childrenList.map((child: any) => ({
      id: child.id,
      http_method: child.label?.split('/')[0],
      path : '/' + child.label?.split('/').slice(1).join('/')
    }));
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked({
      conditions: this.httpControllerProcessorService.conditions,
      services : this.httpControllerProcessorService.services });
  }

  onSubmitClicked(event: any) { }

  onServiceMethodChange(event: any, index: number) {
    this.httpControllerProcessorService.services[index].http_method = event.value;
    this.refreshform_2FormValue();
  }

  onServicePathChange(value: string, index: number) {
    this.httpControllerProcessorService.services[index].path = value;
    this.refreshform_2FormValue();
  }

  onDeleteServiceConfig(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `service with path \"${this.httpControllerProcessorService.services[index].path}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.httpControllerProcessorService.services.splice(index, 1);
        this.refreshform_2FormValue();

      } else {
        console.log('Delete operation cancelled');
      }
    });
  }
}
