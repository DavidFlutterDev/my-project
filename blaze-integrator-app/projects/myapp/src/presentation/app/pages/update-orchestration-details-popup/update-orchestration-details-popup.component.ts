import {
  inject,
  Component,
  OnInit,
  signal,
  WritableSignal,
  computed,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UpdateorchestrationdetailspopupService } from './update-orchestration-details-popup.service';
import {
  ClIconComponent,
  ClIconProperties,
  ClLabelComponent,
  ClLabelProperties,
  ClInputComponent,
  ClInputProperties,
  ClSelectComponent,
  ClSelectProperties,
  ClButtonComponent,
  ClButtonProperties,
} from '@clay/ui-components/basic';
import { FormsModule, NgForm } from '@angular/forms';
import {
  vestForms,
  validateShape,
  FormDirective,
} from '@clay/ui-components/form-validations';
import { createform_26ValidationSuite } from './update-orchestration-details-popup.validations';
import { createform_21ValidationSuite } from '../add-orchestration/add-orchestration.validations';

@Component({
  standalone: true,
  selector: 'app-update-orchestration-details-popup',
  styleUrl: './update-orchestration-details-popup.component.scss',
  templateUrl: './update-orchestration-details-popup.component.html',
  imports: [
    ClIconComponent,
    ClLabelComponent,
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClSelectComponent,
    ClButtonComponent,
  ],
  providers: [UpdateorchestrationdetailspopupService],
})
export class UpdateorchestrationdetailspopupComponent
  implements OnInit, AfterViewInit
{
  constructor() {}
  @ViewChild('form26') form26!: NgForm;

  protected updateOrchestrationDetailsPopupService: UpdateorchestrationdetailspopupService =
    inject(UpdateorchestrationdetailspopupService);
  protected editIconProperties!: ClIconProperties;

  ngOnInit(): void {
    this.editIconProperties =
      this.updateOrchestrationDetailsPopupService.editIconProperties;

    this.popupTitleProperties =
      this.updateOrchestrationDetailsPopupService.popupTitleProperties;

    this.icon8Properties =
      this.updateOrchestrationDetailsPopupService.icon8Properties;

    this.form_26FormValue =
      this.updateOrchestrationDetailsPopupService.form_26FormValue;

    this.input3Properties =
      this.updateOrchestrationDetailsPopupService.input3Properties;

    this.select1Properties =
      this.updateOrchestrationDetailsPopupService.select1Properties;

    this.updateProperties =
      this.updateOrchestrationDetailsPopupService.updateProperties;
  }

  ngAfterViewInit(): void {
    this.updateOrchestrationDetailsPopupService.form26 = this.form26;
  }
  protected popupTitleProperties!: ClLabelProperties;
  protected icon8Properties!: ClIconProperties;
  protected form_26FormValue!: WritableSignal<any>;
  protected readonly form_26Suite = createform_26ValidationSuite;
  protected readonly form_26FormValid = signal<boolean>(false);
  protected readonly form_26Errors = signal<Record<string, string>>({});
  private readonly form_26ViewModel = computed(() => {
    return {
      errors: this.form_26Errors(),
      formValid: this.form_26FormValid(),
      formValue: this.form_26FormValue(),
    };
  });

  protected get form_26Vm() {
    return this.form_26ViewModel();
  }

  protected setform_26FormValue(v: any) {
    this.form_26FormValue.set(v);
    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected validateAll() {
    console.log('form 26', this.form_26FormValid());
    if (this.form_26FormValid() && this.validateAnyChange()) {
      this.updateOrchestrationDetailsPopupService.updateDisabled.set(false);
    } else {
      this.updateOrchestrationDetailsPopupService.updateDisabled.set(true);
    }
  }

  protected validateAnyChange(): boolean {
    console.log('form 26', this.form_26FormValid());
    if (
      this.form_26FormValue().input3 !==
        this.updateOrchestrationDetailsPopupService.recievedData.orchestration_name ||
      this.form_26FormValue().select1 !==
        this.updateOrchestrationDetailsPopupService.recievedData.templateId ||
      this.form_26FormValue().noOfInstance !==
        this.updateOrchestrationDetailsPopupService.recievedData.noOfInstance ||
      this.form_26FormValue().product_code !==
        this.updateOrchestrationDetailsPopupService.recievedData.product_code ||
      this.form_26FormValue().process_code !==
        this.updateOrchestrationDetailsPopupService.recievedData.process_code
    ) {
      return true;
    } else {
      return false;
    }
  }
  protected input3Properties!: ClInputProperties;
  protected select1Properties!: ClSelectProperties;
  protected updateProperties!: ClButtonProperties;
}
