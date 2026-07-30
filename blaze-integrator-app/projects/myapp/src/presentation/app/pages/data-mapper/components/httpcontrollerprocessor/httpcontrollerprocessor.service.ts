import { EventEmitter, Injectable, signal } from "@angular/core";
import { ClLabelProperties, ClButtonProperties, IClButtonType, ClButtonBehavior } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { DataMapperService } from "../../data-mapper.service";

@Injectable()
export class HttpControllerProcessorService {
  services: {id: string, path: string, http_method: string}[];
  conditions: {id: string, label: string}[] = [{id: '' , label: ''}];

  methods: string[] = ['GET', 'PUT', 'POST', 'DELETE'];

  public dynamicFieldsChange: EventEmitter<any> = new EventEmitter();

  constructor(private dataMapperService: DataMapperService) {
    this.services = [{id: this.dataMapperService.generateUniqueId(), path: "", http_method:""}];
  }

  addMoreServices(){
    this.services.push({id: this.dataMapperService.generateUniqueId(), path: "", http_method:""});
    this.dynamicFieldsChange.emit();
  }

  public servicesProperties: ClLabelProperties = {
    "id": `services`, "label": `Services`, "showTooltip": false, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `text-base text-neutral-900 font-bold`,
    },
  };

  public form_2FormValue = signal<any>({});

  public addMoreServicesButtonProperties: ClButtonProperties = {
    "id": `addMoreServicesButton`, "label": `Add more service`, "showFailed": false, "showLoading": false, "showSuccess": false, "type": ClComponentTypes.button, "buttonType": IClButtonType.button, "buttonBehavior": ClButtonBehavior.flat, "style": {
      "cssClasses": `text-primary-500`,
    }, "icon": `heroicons_outline:plus-circle`,
    onSubmit: this.addMoreServices.bind(this)
  };


  public saveButtonProperties: ClButtonProperties = {
    "id": `save`, "label": `Save`,
    "type": ClComponentTypes.button,
    "buttonBehavior": ClButtonBehavior.flat,
    "style": {
      "cssClasses": `mat-primary`,
    },
    "disabled": true,
  };
}
