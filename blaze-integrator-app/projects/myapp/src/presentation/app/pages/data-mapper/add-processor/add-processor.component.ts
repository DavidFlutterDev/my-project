import { MatIconModule } from '@angular/material/icon';
import {
  OnInit, inject, Component,
  ViewEncapsulation, Inject
} from '@angular/core';
import { DataMapperNode, DataMapperProcessorNode } from '../properties/data-mapper.properties';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClButtonComponent, ClButtonProperties, ClIconComponent, ClIconProperties } from '@clay/ui-components/basic';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessorAutocompleteComponent } from '../processor-autocomplete/processor-autocomplete.component';
import { DataMapperService } from '../data-mapper.service';

@Component({
  standalone: true,
  selector: 'app-add-processor',
  templateUrl: './add-processor.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    :host {
      display: flex !important;
      width: 100% !important;
    }
  `],
  imports: [
    MatIconModule,
    ProcessorAutocompleteComponent,
    FormsModule,
    ClIconComponent,
    ClButtonComponent,
  ],
})
export class AddProcessorComponent implements OnInit {
  protected readonly _propertyFactory: ClComponentPropertyFactory = inject(ClComponentPropertyFactory);
  protected readonly closeIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);
  protected selectedProcessComponent?: DataMapperProcessorNode;
  private readonly dataMapperService: DataMapperService = inject(DataMapperService);

  public addButtonProperties: ClButtonProperties = {
    label: 'ADD',
    disabled: false,
    id: 'addProcessBtn',
    type: ClComponentTypes.button,
    style: { cssClasses: "mat-primary mt-4" },
    onSubmit: this.onAddProcess.bind(this)
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddProcessorComponent>) { }

  ngOnInit(): void {
    this.setIconProperties();
  }

  private setIconProperties() {
    this.closeIconProperties.iconName = 'heroicons_outline:x-mark';
    this.closeIconProperties.style!.cssClasses = 'icon-size-6 text-primary';
    this.closeIconProperties.onIconClicked = this.closeDialog.bind(this);
  }

  protected onSelectProcessComponent(process: DataMapperProcessorNode) {
    if (process) {
      this.selectedProcessComponent = process;
    }
  }

  protected onAddProcess() {
    if (this.selectedProcessComponent) {
      let processNode: DataMapperNode = {
        type: this.selectedProcessComponent?.type ?? 'single',
        id: this.selectedProcessComponent?.id ?? this.dataMapperService.generateUniqueId(),
        label: this.selectedProcessComponent.label,
        children: [],
        category: "processor",
        icon: this.dataMapperService.getDataMapperIcon(this.selectedProcessComponent.label), // TODO: this icon should come from mapping
      }
      this.closeDialog(processNode);
    }
  }

  private closeDialog(node?: DataMapperNode) {
    this.dialogRef.close(node);
  }
}
