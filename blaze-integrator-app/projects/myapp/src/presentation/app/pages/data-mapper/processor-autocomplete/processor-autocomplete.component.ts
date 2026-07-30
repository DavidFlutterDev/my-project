
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { inject, OnInit, Component, EventEmitter, Output } from '@angular/core';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import {
  ClInputType, ClInputProperties, ClAutocompleteComponent,
  ClAutoCompleteProperties
} from '@clay/ui-components/basic';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { ApiVariables } from '../../../utils/api.variables';
import { CommonToastService } from '../../common-services/common-toast.services';
import { cloneDeep } from 'lodash';
import { DataMapperProcessorNode } from '../properties/data-mapper.properties';
import { DataMapperService } from '../data-mapper.service';

@Component({
  standalone: true,
  selector: 'app-processor-autocomplete',
  styleUrl: './processor-autocomplete.component.scss',
  templateUrl: './processor-autocomplete.component.html',
  imports: [
    FormsModule,
    MatIconModule,
    ClAutocompleteComponent
  ]
})
export class ProcessorAutocompleteComponent implements OnInit {

  @Output()
  public onSelectProcess: EventEmitter<DataMapperProcessorNode> = new EventEmitter<DataMapperProcessorNode>();

  protected transformationSearchQuery: string = '';
  private readonly dataMapperService: DataMapperService = inject(DataMapperService);
  protected readonly _propertyFactory: ClComponentPropertyFactory = inject(ClComponentPropertyFactory);
  protected readonly searchInputProperties: ClInputProperties = this._propertyFactory.generateProperty(ClComponentTypes.input);
  protected readonly autoCompleteProperties: ClAutoCompleteProperties = this._propertyFactory.generateProperty(ClComponentTypes.autocomplete);

  protected allProcessorsList: any[] = [];
  protected autocompleteOptionsList: any[] = [];

  constructor(private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) {
  }

  ngOnInit(): void {
    this.getProcessorsList();
    this.setInputProperties();
    this.setAutoCompleteProperties()
  }

  private setAutoCompleteProperties() {
    this.autoCompleteProperties.label = 'Component';
    this.autoCompleteProperties.placeholder = 'Component';
    this.autoCompleteProperties.appearance = 'outline';
    this.autoCompleteProperties.style = { cssClasses: "w-full min-w-80 text-md font-bold" };
    this.autoCompleteProperties.onValueChange = (selectedValue: any) => {
      const selection = this.allProcessorsList.find(obj => obj.name === selectedValue);
      if (selection)
        this.emitSelectedComponent(selection);
    }
  }


  getProcessorsList() {
    this.apiClient.getListapi(ApiVariables.component_processor_url)
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.allProcessorsList = data.detail.content;
            this.setAutocompleteOptions();
          } else {
            this.commonToastService.showErrorToast('Unable to fetch data');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  setAutocompleteOptions() {
    this.autocompleteOptionsList = cloneDeep(this.allProcessorsList).map(transformation => ({
      text: transformation.name,
      value: transformation.name
    }));
    this.autoCompleteProperties.options = this.autocompleteOptionsList;
  }

  private setInputProperties() {
    this.searchInputProperties.label = undefined;
    this.searchInputProperties.appearance = 'fill';
    this.searchInputProperties.floatLabel = 'always';
    this.searchInputProperties.subscriptSizing = 'dynamic';
    this.searchInputProperties.inputType = ClInputType.text;
    this.searchInputProperties.style!.cssClasses = 'cl-mat-dense';
    this.searchInputProperties.placeholder = "Search Transformation";
  }

  protected emitSelectedComponent(selectedItem: any) {
    const selectedComponent: DataMapperProcessorNode = {
      id: this.dataMapperService.generateUniqueId(),
      label: selectedItem.name,
      type: selectedItem.structureType
    }
    this.onSelectProcess.emit(selectedComponent);
  }

  protected onTransformationSearch() {
    if (this.transformationSearchQuery) {
      this.autoCompleteProperties.options = this.autocompleteOptionsList.filter((transformation: any) =>
        transformation.name?.includes(this.transformationSearchQuery));
    } else {
      this.setAutocompleteOptions();
    }
  }

}
