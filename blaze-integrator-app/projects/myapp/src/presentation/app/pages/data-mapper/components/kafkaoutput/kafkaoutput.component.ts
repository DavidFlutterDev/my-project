import { inject, Component, signal, WritableSignal, computed, OnInit, Input, Output, EventEmitter, DoCheck } from "@angular/core";
import { KafkaOutputService } from "./kafkaoutput.service";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { createform_16ValidationSuite } from "./kafkaoutput.validations";
import { ClLabelComponent, ClButtonComponent, ClInputComponent } from "@clay/ui-components/basic";
import { ClAccordionComponent, ClExpansionPanelComponent, ClExpansionPanelHeaderComponent, ClExpansionPanelContentComponent } from "@clay/ui-components/containers";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";
import { cloneDeep } from "lodash";
@Component({
  standalone: true,
  selector: 'app-kafkaoutput',
  styleUrl: './kafkaoutput.component.scss',
  templateUrl: './kafkaoutput.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClLabelComponent, ClButtonComponent,
    ClInputComponent, ClAccordionComponent, ClExpansionPanelComponent, ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent, MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [KafkaOutputService],
})
export class KafkaOutputComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog){}

  protected kafkaOutputService: KafkaOutputService = inject(KafkaOutputService);

  ngOnInit(): void {
    this.form_16FormValue = this.kafkaOutputService.form_16FormValue;
    if (this.node.data) {
      this.kafkaOutputService.addressList = cloneDeep(this.node.data.addresses) ?? [''];
      this.setEditFormData(this.node.data);
    }
    this.refreshform_16FormValue();

    this.kafkaOutputService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);

    this.kafkaOutputService.dynamicFieldChange.subscribe(val => {
      this.refreshform_16FormValue();
    })
  }

  ngDoCheck() {
    this.kafkaOutputService.saveButtonProperties.disabled = !this.form_16FormValid();
  }

  protected form_16FormValue!: WritableSignal<any>;
  protected readonly form_16Suite = createform_16ValidationSuite;
  protected readonly form_16FormValid = signal<boolean>(false);

  protected readonly form_16Errors = signal<Record<string, string>>({});
  private readonly form_16ViewModel = computed(() => {
    return {
      errors: this.form_16Errors(),
      formValid: this.form_16FormValid(),
      formValue: this.form_16FormValue(),
    }
  });

  protected get form_16Vm() {
    return this.form_16ViewModel();
  }


  private refreshform_16FormValue() {
    this.setform_16FormValue(this.form_16FormValue());
  }

  protected setform_16FormValue(v: any) {
    this.form_16FormValue.set(v);

    setTimeout(() => {
      const isAddressesValid = this.kafkaOutputService.addressList.filter((val: any) => val === '')?.length === 0;
      this.form_16FormValid.set(this.form_16FormValid() && isAddressesValid);
    });
  }

  setEditFormData(data: any) {
    const values = {
      topic: data.topic,
      client_id: data.client_id,
      count: data.batching?.count,
      // byte_size: data.batching?.byte_size,
      period: data.batching?.period
    }
    this.form_16FormValue.set(values);
  }

  addressValueChange(value: any, index: number) {
    this.kafkaOutputService.addressList[index] = value;
    this.refreshform_16FormValue();
  }

  onDeleteAddress(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `address \"${this.kafkaOutputService.addressList[index]}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.kafkaOutputService.addressList.splice(index, 1);
        this.refreshform_16FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  emitFormData() {
    const valuesJsonData = {
      addresses: this.kafkaOutputService.addressList,
      topic: this.form_16FormValue().topic,
      client_id: this.form_16FormValue().client_id,
      batching: {
        count: this.form_16FormValue()?.count,
        // byte_size: this.form_16FormValue()?.byte_size,
        period: this.form_16FormValue()?.period
      }
    }
    this.node.isDataValid = true;
    this.onSubmitClicked(valuesJsonData);
  }

  onSubmitClicked(event: any) { }
}
