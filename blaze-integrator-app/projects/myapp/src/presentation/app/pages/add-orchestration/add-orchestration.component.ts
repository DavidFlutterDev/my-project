import {
  inject,
  Component,
  OnInit,
  signal,
  WritableSignal,
  computed,
  effect,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AddorchestrationService } from './add-orchestration.service';
import {
  ClCardComponent,
  ClCardProperties,
  ClAccordionComponent,
  ClAccordionProperties,
  ClExpansionPanelComponent,
  ClExpansionPanelHeaderComponent,
  ClExpansionPanelContentComponent,
  ClExpansionPanelHeaderProperties,
} from '@clay/ui-components/containers';
import { FormsModule, NgForm } from '@angular/forms';
import { vestForms, FormDirective } from '@clay/ui-components/form-validations';
import { createform_21ValidationSuite } from './add-orchestration.validations';
import {
  ClInputComponent,
  ClInputProperties,
  ClSelectComponent,
  ClSelectProperties,
  ClButtonComponent,
  ClButtonProperties,
  ClLabelComponent,
  ClLabelProperties,
  ClIconComponent,
  ClIconProperties,
} from '@clay/ui-components/basic';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DataMapping } from '../data-mapper/properties/data-mapper.properties';
import { DataMapperComponent } from '../data-mapper/data-mapper.component';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from "../../templates/breadcrumb/breadcrumb.component";

@Component({
  standalone: true,
  selector: 'app-add-orchestration',
  styleUrl: './add-orchestration.component.scss',
  templateUrl: './add-orchestration.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    
    ClCardComponent,
    vestForms,
    FormsModule,
    FormDirective,
    ClInputComponent,
    ClSelectComponent,
    ClButtonComponent,
    ClAccordionComponent,
    ClExpansionPanelComponent,
    ClExpansionPanelHeaderComponent,
    ClExpansionPanelContentComponent,
    ClLabelComponent,
    ClIconComponent,
    CommonModule,
    DataMapperComponent,
    BreadcrumbComponent
],
  providers: [AddorchestrationService, MatDialog],
})
export class AddorchestrationComponent implements OnInit {
  constructor(private router: Router) {
    this.checkforPageArguments();

    effect(() => {
      this.orchestrationTemplateData =
        this.addorchestrationService.orchestrationTemplateData;
      console.log(this.orchestrationTemplateData());
    });
  }
  @ViewChild('form21') form21!: NgForm;

  protected addorchestrationService: AddorchestrationService = inject(
    AddorchestrationService,
  );
  protected card0Properties!: ClCardProperties;
  orchestrationTemplateData: any;

  protected orchestration_nameProperties!: ClInputProperties;
  protected Orchestration_templateProperties!: ClSelectProperties;
  protected continueBtProperties!: ClButtonProperties;
  protected accordion0Properties!: ClAccordionProperties;
  protected accordion0Accordion1HeaderProperties: ClExpansionPanelHeaderProperties =
    new ClExpansionPanelHeaderProperties();
  protected card2Properties!: ClCardProperties;
  protected tickIconProperties!: ClIconProperties;
  protected label5Properties!: ClLabelProperties;
  protected rightArrowProperties!: ClIconProperties;
  protected icon3Properties!: ClIconProperties;
  protected card3Properties!: ClCardProperties;
  protected showDataMapperScreen: boolean = false;

  dataMapperJson?: DataMapping;
  selectedTemplateDetails: any;
  orchestrationId: any;

  checkforPageArguments() {
    var recievedData = JSON.stringify(
      this.router.getCurrentNavigation()?.extras.state,
    );

    if (recievedData != undefined && recievedData != null) {
      var parsedRecievedData =
        recievedData != null && recievedData != undefined
          ? JSON.parse(recievedData)
          : { data: '' };
      this.orchestrationId = parsedRecievedData.id;
      this.addorchestrationService.getComponentsList();

      this.addorchestrationService.getOrchestrationById(this.orchestrationId);
    } else {
      console.log('No Data received from list screen');
    }
  }

  ngOnInit(): void {
    this.card0Properties = this.addorchestrationService.card0Properties;

    this.form_21FormValue = this.addorchestrationService.form_21FormValue;

    this.orchestration_nameProperties =
      this.addorchestrationService.orchestration_nameProperties;

    this.Orchestration_templateProperties =
      this.addorchestrationService.Orchestration_templateProperties;

    this.continueBtProperties =
      this.addorchestrationService.continueBtProperties;
    this.continueBtProperties.onSubmit = this.onTapContinue.bind(this);

    this.accordion0Properties =
      this.addorchestrationService.accordion0Properties;
    this.accordion0Accordion1HeaderProperties =
      this.addorchestrationService.accordion0Accordion1HeaderProperties;

    this.card2Properties = this.addorchestrationService.card2Properties;

    this.tickIconProperties = this.addorchestrationService.tickIconProperties;

    this.label5Properties = this.addorchestrationService.label5Properties;

    this.rightArrowProperties =
      this.addorchestrationService.rightArrowProperties;

    this.icon3Properties = this.addorchestrationService.icon3Properties;


    this.card3Properties = this.addorchestrationService.card3Properties;

    this.addorchestrationService.showDataMapperScreen.subscribe((data: any) => {
      this.showDataMapperScreen = data;
    });

    this.addorchestrationService.selectedTemplateIndex.subscribe(
      (index: any) => {
        this.selectedTemplateIndex = index;
      },
    );

    this.addorchestrationService.selectedTemplateDetails.subscribe(
      (data: any) => {
        this.selectedTemplateDetails = data;
      },
    );

    this.addorchestrationService.dataMapperJson.subscribe((data: any) => {
      this.dataMapperDataChanged(data);
    });

    this.getOrchestrationTemplateList();

  }

  protected form_21FormValue!: WritableSignal<any>;
  protected readonly form_21Suite = (model: any, field: string) =>
    createform_21ValidationSuite(model, field, this.addorchestrationService);
  protected readonly form_21FormValid = signal<boolean>(false);
  protected readonly form_21Errors = signal<Record<string, any>>({});
  private readonly form_21ViewModel = computed(() => {
    return {
      errors: this.form_21Errors(),
      formValid: this.form_21FormValid(),
      formValue: this.form_21FormValue(),
    };
  });

  protected get form_21Vm() {
    return this.form_21ViewModel();
  }

  protected setform_21FormValue(v: any) {
    this.form_21FormValue.set(v);
    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected validateAll() {
    if (this.form_21FormValid()) {
      this.addorchestrationService.continueBtDisabled.set(false);
    } else {
      this.addorchestrationService.continueBtDisabled.set(true);
    }
  }

  getLabel4Properties(label: string) {
    return this.addorchestrationService.getLabel4Properties(label);
  }

  getOrchestrationTemplateList() {
    this.addorchestrationService.getOrchestrationTemplateList();
  }

  selectedTemplateIndex: any;
  onClickTemplateTile(run: any, index: any) {
    if (
      run.pipelineId ||
      (index != 0 &&
        this.addorchestrationService.configSteps[index - 1]?.pipelineId)
    ) {
      this.addorchestrationService.onClickTemplateTile(index);
    }
  }

  getStepTilesCss(index: number): string {
    let temp = 'flex gap-4 w-full flex-row border-2 rounded-md p-2 mb-2 ';
    if (index == this.selectedTemplateIndex) {
      temp = temp + 'border-blue-500 ';
    }
    return temp;
  }

  getStepsTileIndexCSS(index: number) {
    let temp = 'background-color:  #2D78E8';

    return temp;
  }

  dataMapperDataChanged(updatedJson: any) {
    this.dataMapperJson = cloneDeep(updatedJson);

    if (
      this.dataMapperJson &&
      this.dataMapperJson.processes &&
      this.dataMapperJson.destination
    ) {
      const isInputValid = this.addorchestrationService.isStructureValid(
        this.dataMapperJson.sources,
      );
      const isProcessesValid = this.addorchestrationService.isStructureValid(
        this.dataMapperJson.processes,
      );
      const isOutputValid = this.addorchestrationService.isStructureValid([
        this.dataMapperJson.destination,
      ]);

      setTimeout(() => {
        this.addorchestrationService.continueBtDisabled.set(
          !(isInputValid && isProcessesValid && isOutputValid),
        );
      }, 100);
    }
  }

  async onTapContinue() {
    if (this.showDataMapperScreen == true) {
      const temptPipelineConfig =
        this.addorchestrationService.reverseDataMapperJson(this.dataMapperJson);

      this.addorchestrationService.createPipeline(temptPipelineConfig);
    } else {
      this.addorchestrationService.continueBtDisabled.set(true);
      let isNameTaken: boolean =
        await this.addorchestrationService.checkOrchestrationName(
          this.form_21FormValue().orchestration_name,
        );
      this.addorchestrationService.continueBtDisabled.set(false);
      setTimeout(() => {});
      if (isNameTaken === true) {
        this.form21.form.controls['orchestration_name'].setErrors({
          error: 'Orchestartion Name already taken',
        });
        this.addorchestrationService.continueBtDisabled.set(true);
      } else if (isNameTaken === false) {
        this.addorchestrationService.formData = {
          orchestration_name:  this.form_21FormValue().orchestration_name,
          product_code:  this.form_21FormValue().product_code,
          process_code:  this.form_21FormValue().process_code,
          noOfInstance:  this.form_21FormValue().noOfInstance,
          Orchestration_template:
             this.form_21FormValue().Orchestration_template,
        }
        this.addorchestrationService.updateAccordionHeader(
          this.form_21FormValue().orchestration_name,
        );
        this.addorchestrationService.getComponentsList();
        this.addorchestrationService.getOrchestrationTemplateDetails(
          this.form_21FormValue().Orchestration_template,
        );
      }
    }
  }
}
