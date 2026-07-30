import { inject, Component, signal, WritableSignal, computed, OnInit, DoCheck, Input } from "@angular/core";
import { SwitchProcessorService } from "./switchprocessor.service";
import { FormsModule } from "@angular/forms";
import { vestForms, FormDirective } from "@clay/ui-components/form-validations";
import { ClButtonComponent } from "@clay/ui-components/basic";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { staticSuite } from "vest";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../confirmation-dialog/confirmation-dialog.component";

@Component({
  standalone: true,
  selector: 'app-switchprocessor',
  styleUrl: './switchprocessor.component.scss',
  templateUrl: './switchprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClButtonComponent,
    MatFormFieldModule, MatInputModule, MatIconModule,
  ],
  providers: [SwitchProcessorService],
})
export class SwitchProcessorComponent implements OnInit, DoCheck {
  @Input({ required: true })
  public node: any;

  protected switchProcessorService: SwitchProcessorService = inject(SwitchProcessorService);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form_0FormValue = this.switchProcessorService.form_0FormValue;
    if(this.node.children?.length > 0) {
      this.switchProcessorService.conditions = this.setEditData(this.node.children);
    }

    this.refreshform_0FormValue();

    this.switchProcessorService.button7Properties.onSubmit = this.emitFormData.bind(this);

    this.switchProcessorService.dynamicFieldsChange.subscribe(val => {
      this.refreshform_0FormValue();
    });
  }

  ngDoCheck() {
    this.switchProcessorService.button7Properties.disabled = !this.form_0FormValid();
  }

  protected form_0FormValue!: WritableSignal<any>;
  protected readonly form_0Suite = staticSuite((model: any, field: string) => { });
  protected readonly form_0FormValid = signal<boolean>(false);
  protected readonly form_0Errors = signal<Record<string, string>>({});
  private readonly form_0ViewModel = computed(() => {
    return {
      errors: this.form_0Errors(),
      formValid: this.form_0FormValid(),
      formValue: this.form_0FormValue(),
    }
  });

  protected get form_0Vm() {
    return this.form_0ViewModel();
  }

  private refreshform_0FormValue() {
    this.setform_0FormValue(this.form_0FormValue());
  }

  protected setform_0FormValue(v: any) {
    setTimeout(() => {
      const isMappingValid = this.switchProcessorService.conditions.filter((val: any) => val.label === '')?.length === 0;
      this.form_0FormValid.set(isMappingValid);
    });
  }

  setEditData(childrenList: any[]): {id: string, label: string}[] {
    return childrenList.map((child: any) => ({
      id: child.id,
      label: child.label
    }));
  }

  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked({conditions: this.switchProcessorService.conditions});
  }

  onSubmitClicked(event: any) { }

  onCheckValueChange(value: string, index: number) {
    this.switchProcessorService.conditions[index].label = value;
    this.refreshform_0FormValue();
  }

  onDeleteCheck(index: number) {
    // show confirmation
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `check \"${this.switchProcessorService.conditions[index]}\"` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.switchProcessorService.conditions.splice(index, 1);
        this.refreshform_0FormValue();
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }
}
