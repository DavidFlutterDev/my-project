import { MatIconModule } from '@angular/material/icon';
import { OnInit, inject, Component, ViewEncapsulation, Inject} from '@angular/core';
import { DataMapperNode } from '../properties/data-mapper.properties';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClButtonComponent, ClButtonProperties, ClIconComponent, ClIconProperties } from '@clay/ui-components/basic';
import { ClComponentInjectorComponent, ClComponentTypes } from '@clay/ui-components/shared';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClDynamicComponent } from '@clay/ui-components/containers';
import { cloneDeep } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-component-config',
  templateUrl: './component-config.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    :host {
      display: flex !important;
      width: 100% !important;
    }
  `],
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ClDynamicComponent,
    ClIconComponent,
    ClButtonComponent,
    ClComponentInjectorComponent
  ],
})
export class ComponentConfigComponent implements OnInit {
  protected readonly _propertyFactory: ClComponentPropertyFactory = inject(ClComponentPropertyFactory);
  protected readonly closeIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);

  protected dynamicProperties: any = {};

  public saveButtonProperties: ClButtonProperties = this._propertyFactory.generateProperty(ClComponentTypes.button);
  public formGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ComponentConfigComponent>) { }

  ngOnInit(): void {
    this.setIconProperties();
    this.setButtonProperties();

    if(this.data.templateData?.templateJson) {
      const dynamicFormJson = cloneDeep(this.data.templateData?.templateJson);
      this.modifyTemplateJson(dynamicFormJson?.children);
      this.dynamicProperties = dynamicFormJson;
      setTimeout(()=> {
        this.formGroup.patchValue(cloneDeep(this.data.node.data));
        this.formGroup.updateValueAndValidity();
        console.log(this.data.templateData.templateJson);
      });
    }
    // Observe the form's validity status
    this.formGroup.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.saveButtonProperties.disabled = false;
      } else {
        this.saveButtonProperties.disabled = true;
      }
    });
  }

  private setIconProperties() {
    this.closeIconProperties.iconName = 'heroicons_outline:x-mark';
    this.closeIconProperties.style!.cssClasses = 'icon-size-6 text-primary';
    this.closeIconProperties.onIconClicked = this.closeDialog.bind(this);
  }

  private setButtonProperties(){
    this.saveButtonProperties.label = 'Save';
    this.saveButtonProperties.style!.cssClasses += ' rounded-lg';
    this.saveButtonProperties.style!.labelCssClasses = 'text-base text-white font-semibold';
    this.saveButtonProperties.disabled = true;
    this.saveButtonProperties.onSubmit = () => {
      const node: DataMapperNode = cloneDeep(this.data.node);
      node.data = this.formGroup.value;
      node.isDataValid = true;
      this.closeDialog(node);
    }
  }

  private closeDialog(node?: DataMapperNode) {
    if(node){
      this.dialogRef.close(node);
    } else {
      this.dialogRef.close(this.data.node);
    }
  }

  modifyTemplateJson(input: any): any{
    for (let ele of input) {
      // Check if the current node's name matches the target
      if (ele.layout === 'form') {
        ele.formGroup =  this.formGroup;
      }

      if(ele.properties?.validationsList?.length > 0){
        ele.properties.validationsList = cloneDeep(this.convertValidations(ele.properties?.validationsList));
      }

      // If the node has children, search recursively within them
      if (ele.children) {
        this.modifyTemplateJson(ele.children);
      }

      if (ele.layout === 'accordion') {
        for (let expPanel of ele.properties.expansionPanelProperties) {
          this.modifyTemplateJson(expPanel.expansionPanelContentProperties);
        }
      }
    }
  }
  // Convert validation list strings to Angular Validators
  convertValidations(validationStrings: string[]): any[] {
    return validationStrings.map(validation => {
      const [validator, value] = validation.split(':'); // Split on ':'

      switch (validator) {
        case 'required':
          return Validators.required;
        case 'minLength':
          return Validators.minLength(Number(value));
        case 'maxLength':
          return Validators.maxLength(Number(value));
        case 'pattern':
          return Validators.pattern(value);
        case 'min':
          return Validators.min(Number(value));
        case 'max':
          return Validators.max(Number(value));
        default:
          return null;
      }
    }).filter(validator => validator !== null); // Remove any null values
  }


  componentFromChange(event: any) {
    console.log(107, event[0]);
    const node = cloneDeep(this.data.node);
    node.data = event[0];
    this.closeDialog(node);
  }
}
