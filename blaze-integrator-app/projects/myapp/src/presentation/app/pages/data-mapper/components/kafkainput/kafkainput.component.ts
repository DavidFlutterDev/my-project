import { inject, Component, signal, WritableSignal, computed, OnInit, Input, DoCheck} from "@angular/core";
import { KafkaInputService } from "./kafkainput.service";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { createform_25ValidationSuite } from "./kafkainput.validations";
import { ClLabelComponent, ClButtonComponent, ClInputComponent, ClRadioComponent } from "@clay/ui-components/basic";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";
import { cloneDeep } from "lodash";

@Component({
  standalone: true,
  selector: 'app-kafkainput',
  styleUrl: './kafkainput.component.scss',
  templateUrl: './kafkainput.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClLabelComponent, ClButtonComponent,
    ClInputComponent, ClRadioComponent, MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [KafkaInputService],
})
export class KafkaInputComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  constructor(public dialog: MatDialog){}

  protected kafkaInputService: KafkaInputService = inject(KafkaInputService);

  ngOnInit(): void {
    this.form_25FormValue = this.kafkaInputService.form_25FormValue;
    if(this.node.data) {
      this.kafkaInputService.addressList = cloneDeep(this.node.data.addresses) ?? [''];
      this.kafkaInputService.topicList = cloneDeep(this.node.data.topics) ?? [''];
      this.form_25FormValue.set(this.node.data);
    }
    this.refreshform_25FormValue();

    this.kafkaInputService.saveButtonProperties.onSubmit = this.emitFormData.bind(this);

    this.kafkaInputService.dynamicFieldChange.subscribe(val => {
      this.refreshform_25FormValue();
    })
  }

  ngDoCheck() {
    this.kafkaInputService.saveButtonProperties.disabled = !this.form_25FormValid();
  }

  protected form_25FormValue!: WritableSignal<any>;
  protected readonly form_25Suite = createform_25ValidationSuite;
  protected readonly form_25FormValid = signal<boolean>(false);
  protected readonly form_25Errors = signal<Record<string, string>>({});
  private readonly form_25ViewModel = computed(() => {
    return {
      errors: this.form_25Errors(),
      formValid: this.form_25FormValid(),
      formValue: this.form_25FormValue(),
    }
  });

  protected get form_25Vm() {
    return this.form_25ViewModel();
  }

  private refreshform_25FormValue() {
    this.setform_25FormValue(this.form_25FormValue());
  }

  protected setform_25FormValue(v: any) {
    v.addresses = this.kafkaInputService.addressList;
    v.topics = this.kafkaInputService.topicList;
    this.form_25FormValue.set(v);

    setTimeout(()=> {
      if(this.node.category === 'Input') {
        const isAddressesValid = v.addresses.filter((val: any) => val === '')?.length === 0;
        const isTopicsValid = v.topics.filter((val: any) => val === '')?.length === 0;
        this.form_25FormValid.set(isAddressesValid && isTopicsValid);
      }
    });
  }

  addressValueChange(value: any, index:number) {
    this.kafkaInputService.addressList[index] = value;
    this.refreshform_25FormValue();
  }

  onDeleteAddress(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `address \"${this.kafkaInputService.addressList[index]}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.kafkaInputService.addressList.splice(index, 1);
        this.refreshform_25FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  topicValueChange(value: any, index:number) {
    this.kafkaInputService.topicList[index] = value;
    this.refreshform_25FormValue();
  }

  onDeleteTopic(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `topic \"${this.kafkaInputService.topicList[index]}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.kafkaInputService.topicList.splice(index, 1);
        this.refreshform_25FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_25FormValue());
  }

  onSubmitClicked(event: any) {}
}
