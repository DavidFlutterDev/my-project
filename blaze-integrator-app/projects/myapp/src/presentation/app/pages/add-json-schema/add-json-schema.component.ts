import {
  inject,
  Component,
  OnInit,
  signal,
  WritableSignal,
  computed,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { AddjsonschemaService } from './add-json-schema.service';
import {
  ClCardComponent,
  ClCardProperties,
  ClDynamicTreeViewComponent,
  ClDynamicTreeViewProperties,
  DynamicTreeViewService,
} from '@clay/ui-components/containers';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  validateShape,
  FormDirective,
  FormModelDirective,
} from '@clay/ui-components/form-validations';
import {
  TreeFormModel,
  TreeNode,
  createTreeValidationSuite,
  createform_41ValidationSuite,
} from './add-json-schema.validations';
import {
  ClInputComponent,
  ClInputProperties,
  ClButtonComponent,
  ClButtonProperties,
  ClLabelComponent,
  ClLabelProperties,
  ClIconComponent,
  ClIconProperties,
  ClTextareaComponent,
  ClTextareaProperties,
  IClButtonType,
  ClButtonBehavior,
  ClCodeViewComponent,
  ClCodeViewProperties,
} from '@clay/ui-components/basic';
import { JsonSchemaInputFieldsService } from './json-schema-input-fields.service';
import { JsonFieldTypes } from './json-schema-enums';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { GlobalVariables } from '../../utils/global.variables';
import { CommonToastService } from '../common-services/common-toast.services';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { Router } from '@angular/router';
import { ApiVariables } from '../../utils/api.variables';
import { RoutingVariables } from '../../utils/routing.variables';
import { enforce, staticSuite, test } from 'vest';
import {
  JsonSchemaDataModel,
  jsonSchemadatamodelShape,
} from '../../models/jsonSchemaModel';
import { MatDialog } from '@angular/material/dialog';
import { CodePreviewDialogComponent } from '../code-preview-dialog/code-preview-dialog.component';
import { BreadcrumbComponent } from '../../templates/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-add-json-schema',
  styleUrl: './add-json-schema.component.scss',
  templateUrl: './add-json-schema.component.html',
  imports: [
    FormsModule,
    FormDirective,
    ClIconComponent,
    ClCardComponent,
    ClInputComponent,
    ClLabelComponent,
    ClButtonComponent,
    ClDynamicTreeViewComponent,
    ClCodeViewComponent,
    FormDirective,
    FormModelDirective,
    BreadcrumbComponent,
  ],
  providers: [
    AddjsonschemaService,
    JsonSchemaInputFieldsService,
    DynamicTreeViewService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddjsonschemaComponent implements OnInit {
  constructor(
    private commonToastService: CommonToastService,
    private apiClient: ApiClient,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.checkforPageArguments();
  }
  @ViewChild('treeForm') treeForm!: NgForm;

  protected addjsonschemaService: AddjsonschemaService =
    inject(AddjsonschemaService);

  protected fieldsService: JsonSchemaInputFieldsService = inject(
    JsonSchemaInputFieldsService,
  );
  protected formCardProperties!: ClCardProperties;

  protected jsonSchemaNameProperties!: ClInputProperties;
  protected previewButtonProperties!: ClButtonProperties;
  protected saveProperties!: ClButtonProperties;
  protected previewCardProperties!: ClCardProperties;
  protected previewProperties!: ClLabelProperties;
  protected zoomInProperties!: ClIconProperties;
  protected zoomOutProperties!: ClIconProperties;
  protected expandProperties!: ClIconProperties;
  public codeViewProperties!: ClCodeViewProperties;
  protected dynamicTreeViewProperties!: ClDynamicTreeViewProperties;

  protected dynamicTreeService: DynamicTreeViewService = inject(
    DynamicTreeViewService,
  );
  protected subscription?: Subscription;
  protected nodeJsonData: any = { id: '', nodes: [] };
  protected previewJson: any;

  previewFontSizeIndex: number = 1;
  validationSchemaId: any;
  validationSchemaData: any;
  ngOnInit(): void {
    this.formCardProperties = this.addjsonschemaService.formCardProperties;

    this.form_41FormValue = this.addjsonschemaService.form_41FormValue;

    this.jsonSchemaNameProperties =
      this.addjsonschemaService.jsonSchemaNameProperties;

    this.previewButtonProperties =
      this.addjsonschemaService.previewButtonProperties;

    this.saveProperties = this.addjsonschemaService.saveProperties;
    if (this.validationSchemaId) {
      this.saveProperties.label = 'Update';
    }
    this.previewCardProperties =
      this.addjsonschemaService.previewCardProperties;

    this.previewProperties = this.addjsonschemaService.previewProperties;

    this.zoomInProperties = this.addjsonschemaService.zoomInProperties;
    this.zoomInProperties.onIconClicked = this.zoomIn.bind(this);

    this.zoomOutProperties = this.addjsonschemaService.zoomOutProperties;
    this.zoomOutProperties.onIconClicked = this.zoomOut.bind(this);

    this.expandProperties = this.addjsonschemaService.expandProperties;
    this.expandProperties.onIconClicked = this.expandPreview.bind(this);

    this.codeViewProperties = this.addjsonschemaService.codeViewProperties;
    this.codeViewProperties.style = {
      cssClasses: 'flex-auto w-full',
      fontStyle: GlobalVariables.fontSizeValues[this.previewFontSizeIndex],
    };

    this.dynamicTreeViewProperties =
      this.addjsonschemaService.dynamicTreeViewProperties;

    this.subscription = this.dynamicTreeService.addChildNode.subscribe(
      (data: any) => {
        this.onClickAddChildren(data.node);
      },
    );
  }

  ngAfterViewInit(): void {
    this.dynamicTreeViewProperties.nodes = [];

    // this.onClickAddField();

    this.dynamicTreeViewProperties.addButtonProperties = {
      id: 'AddfieldBt',
      label: 'Add field',
      showFailed: false,
      showLoading: false,
      showSuccess: false,
      type: ClComponentTypes.button,
      buttonType: IClButtonType.button,
      buttonBehavior: ClButtonBehavior.flat,
      style: {
        alignContent: '',
        contentWidth: '',
        justifyContent: '',
        iconCssClasses: '',
        labelCssClasses: '',
        cssClasses: 'text-primary-600',
      },
      icon: 'heroicons_outline:plus-circle',
      onSubmit: this.onClickAddField.bind(this),
    };
  }

  checkforPageArguments() {
    var recievedData = JSON.stringify(
      this.router.getCurrentNavigation()?.extras.state,
    );

    if (recievedData != undefined && recievedData != null) {
      var parsedRecievedData =
        recievedData != null && recievedData != undefined
          ? JSON.parse(recievedData)
          : { data: '' };
      this.validationSchemaId = parsedRecievedData.id;
      console.log('jsonId from list screen', this.validationSchemaId);
      this.getValidationSchemaById();
    } else {
      setTimeout(() => {
        this.onClickAddField();
      });
      console.log('No Data received from list screen');
    }
  }
  updateBreadcrumbData(name: any) {
    this.addjsonschemaService.breadcrumbData[1].label = name;
    this.addjsonschemaService.breadcrumbData.push({
      label: 'Edit',
    });
  }
  async getValidationSchemaById() {
    this.addjsonschemaService.getValidationSchemaById(this.validationSchemaId);

    this.addjsonschemaService.validationSchemaData.subscribe((value) => {
      this.validationSchemaData = value;
      if (
        this.validationSchemaData != undefined &&
        this.validationSchemaData != null
      ) {
        this.updateBreadcrumbData(this.validationSchemaData.schemaName),
          //  to set the Json schema name
          this.form_41FormValue.set({
            jsonSchemaName: this.validationSchemaData.schemaName,
          });

        this.setSchemaDataToDynamicTreeView(
          this.validationSchemaData.schemaConfig,
          null,
        );
      }
    });
  }

  async setSchemaDataToDynamicTreeView(data: any, parentFormId: any | null) {
    if (data && data.properties) {
      for (const key of Object.keys(data.properties)) {
        const field = data.properties[key];
        // var nodes: FormArray;
        var currentFormNode;
        // Ensure onClickAddField completes before proceeding
        if (parentFormId) {
          const parentFormNode = this.findNodeById(
            this.dynamicTreeViewProperties.nodes ?? [],
            parentFormId,
          );
          await new Promise((resolve) => setTimeout(resolve, 0));

          await this.onClickAddChildren(parentFormNode);
          // Use a small delay to ensure the form updates
          await new Promise((resolve) => setTimeout(resolve, 0));

          const nodes: FormArray = this.findFormNodeById(
            this.treeForm.form.controls!['nodes'] as FormArray,
            parentFormId,
          ).controls['nodes'] as FormArray;
          // var nodes2 = nodes.controls['nodes'] as FormArray ;
          currentFormNode = nodes.controls.at(
            nodes.controls.length - 1,
          ) as FormGroup;
          await new Promise((resolve) => setTimeout(resolve, 0));
        } else {
          await this.onClickAddField();
          // Use a small delay to ensure the form updates
          await new Promise((resolve) => setTimeout(resolve, 0));

          const nodes: FormArray = this.treeForm.form.controls![
            'nodes'
          ] as FormArray;
          currentFormNode = nodes.controls.at(
            nodes.controls.length - 1,
          ) as FormGroup;
        }

        var parentId = parseFloat(Object.keys(currentFormNode.controls)[0]);

        if (currentFormNode instanceof FormGroup) {
          // Now set values

          currentFormNode.get('fieldName')?.setValue(key);
          this.updateJsonDataObj(parentId, 'fieldName', key);

          currentFormNode.get('fieldType')?.setValue(field.type);
          this.updateJsonDataObj(parentId, 'fieldType', field.type);
          currentFormNode
            .get('required')
            ?.setValue(data.required?.includes(key) ? 'Yes' : 'No');

          this.onFieldTypeValueChange(parentId, field.type);

          await new Promise((resolve) => setTimeout(resolve, 100));

          var pattern,
            minLength,
            exclusiveMinimum,
            exclusiveMaximum,
            minimum,
            maximum;
          if (field.type === JsonFieldTypes.array) {
            currentFormNode.get('itemType')?.setValue(field.items.type ?? null);
            this.onArrayItemTypeValueChange(parentId, field.items.type);

            await new Promise((resolve) => setTimeout(resolve, 100));
            (pattern = field.items.pattern),
              (minLength = field.items.minLength),
              (exclusiveMinimum = field.items.exclusiveMinimum),
              (exclusiveMaximum = field.items.exclusiveMaximum),
              (minimum = field.items.minimum),
              (maximum = field.items.maximum);
          } else {
            (pattern = field.pattern),
              (minLength = field.minLength),
              (exclusiveMinimum = field.exclusiveMinimum),
              (exclusiveMaximum = field.exclusiveMaximum),
              (minimum = field.minimum),
              (maximum = field.maximum);
          }
          currentFormNode.get('pattern')?.setValue(pattern ?? '');
          this.updateJsonDataObj(parentId, 'pattern', pattern);

          currentFormNode.get('minLength')?.setValue(minLength ?? '');
          this.updateJsonDataObj(parentId, 'minLength', minLength);
          currentFormNode
            .get('exclusiveMinimum')
            ?.setValue(exclusiveMinimum ? 'Yes' : 'No');
          this.exclusiveMinimumValueChange(
            parentId,
            exclusiveMinimum ? 'Yes' : 'No',
          );
          currentFormNode
            .get('exclusiveMaximum')
            ?.setValue(exclusiveMaximum ? 'Yes' : 'No');
          this.exclusiveMaximumValueChange(
            parentId,
            exclusiveMaximum ? 'Yes' : 'No',
          );
          currentFormNode
            .get('minimum')
            ?.setValue(exclusiveMinimum ?? minimum ?? '');
          this.updateJsonDataObj(
            parentId,
            'minimum',
            exclusiveMinimum ?? minimum ?? '',
          );
          currentFormNode
            .get('maximum')
            ?.setValue(exclusiveMaximum ?? maximum ?? '');
          this.updateJsonDataObj(
            parentId,
            'maximum',
            exclusiveMaximum ?? maximum ?? '',
          );
          // this.updateJsonDataObj(
          //   parentId,
          //   'exclusiveMaximum',
          //   exclusiveMinimum,
          // );
          // this.updateJsonDataObj(
          //   parentId,
          //   'exclusiveMaximum',
          //   exclusiveMaximum,
          // );
          // this.updateJsonDataObj(
          //   parentId,
          //   'minimum',
          //   minimum,
          // );
          // this.updateJsonDataObj(
          //   parentId,
          //   'maximum',
          //   maximum,
          // );

          if (field.properties) {
            //  if we have properties loop inside
            this.setSchemaDataToDynamicTreeView(field, parentId);
          } else if (field.items && field.items.properties) {
            //  if we have properties loop inside
            this.setSchemaDataToDynamicTreeView(field.items, parentId);
          }
        }
      }

      console.log(100, this.dynamicTreeViewProperties.nodes);
      console.log(100, this.treeForm);
    }
  }

  protected form_41FormValue!: WritableSignal<any>;

  protected readonly form_41Suite = createform_41ValidationSuite;
  protected readonly form_41FormValid = signal<boolean>(false);
  protected readonly form_41Errors = signal<Record<string, string>>({});
  private readonly form_41ViewModel = computed(() => {
    return {
      errors: this.form_41Errors(),
      formValid: this.form_41FormValid(),
      formValue: this.form_41FormValue(),
    };
  });

  protected get form_41Vm() {
    return this.form_41ViewModel();
  }

  protected setform_41FormValue(v: any) {
    this.form_41FormValue.set(v);
    setTimeout(() => {
      this.validateAll();
    }, 100);
    validateShape(v, jsonSchemadatamodelShape);
  }
  protected onform_41FormSubmit() {
    console.log(this.form_41ViewModel().formValue);
  }

  protected readonly treeSuite = createTreeValidationSuite;
  protected readonly treeFormValue = signal<TreeFormModel[]>([]);
  protected readonly isTreeFormValid = signal<boolean>(false);

  treeFormValues(value: any) {
    this.treeFormValue.set(value);
  }
  treeValidChange(value: any) {
    this.isTreeFormValid.set(value);
    setTimeout(() => {
      this.validateAll();
    }, 100);
  }

  protected validateAll() {
    if (this.form_41FormValid() && this.isTreeFormValid()) {
      this.addjsonschemaService.saveDisabled.set(false);
    } else {
      this.addjsonschemaService.saveDisabled.set(true);
    }
  }

  public zoomIn() {
    if (this.previewFontSizeIndex < GlobalVariables.fontSizeValues.length) {
      this.previewFontSizeIndex++;
      this.codeViewProperties.style = {
        fontStyle: GlobalVariables.fontSizeValues[this.previewFontSizeIndex],
      };
    }
  }
  public zoomOut() {
    if (this.previewFontSizeIndex > 0) {
      this.previewFontSizeIndex--;
      this.codeViewProperties.style = {
        fontStyle: GlobalVariables.fontSizeValues[this.previewFontSizeIndex],
      };
    }
  }

  public expandPreview() {
    const dialogRef = this.dialog.open(CodePreviewDialogComponent, {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      data: { code: this.previewJson }, // Pass any data needed
    });
  }

  public async onClickAddField() {
    let node = this.fieldsService.getParentCard(
      `Field ${(this.dynamicTreeViewProperties.nodes?.length ?? 0) + 1}`,
      this.onDelete.bind(this),
      this.onFieldNameValueChange.bind(this),
      this.onFieldTypeValueChange.bind(this),
      this.onRequiredValueChange.bind(this),
    );

    this.dynamicTreeViewProperties.nodes!.push(node);

    this.setDefaultValueForIsRequiredRadio(node.id);
    // json added for parent node.. now nneds to add to child
    this.nodeJsonData.nodes.push(this.fieldsService.getNodeJson(node.id));
    console.log(100, 'forms: ', this.treeForm.form.controls!['nodes']);
    this.modifyDeleteVisibilityForParentNode();
  }

  setDefaultValueForIsRequiredRadio(nodeId: any) {
    // setting required radio to yes for the node
    setTimeout(() => {
      let tempFormNode = this.findFormNodeById(
        this.treeForm.form.controls!['nodes'] as FormArray,
        nodeId,
      );
      tempFormNode.get('required')?.setValue('Yes');
    });
  }

  public async onClickAddChildren(parentNode: any, showLabel: boolean = true) {
    try {
      if (parentNode.nodes === undefined) {
        parentNode.nodes = [];
      }
      let node = this.fieldsService.getParentCard(
        showLabel ? `Object propety ${parentNode.nodes.length + 1}` : '',
        this.onDelete.bind(this),
        this.onFieldNameValueChange.bind(this),
        this.onFieldTypeValueChange.bind(this),
        this.onRequiredValueChange.bind(this),
      );
      if (node != undefined) {
        parentNode.nodes.push(node);
        this.setDefaultValueForIsRequiredRadio(node.id);

        // creating json data template for current child
        var currentJsonDataObj = this.findNodeById(
          this.nodeJsonData.nodes,
          parentNode.id,
        );
        if (currentJsonDataObj != null) {
          currentJsonDataObj.nodes.push(
            this.fieldsService.getNodeJson(node.id),
          );
        }
      }
    } catch (error) {
      console.log(123, 'error: parentNode.nodes : ', parentNode.nodes);
    }
  }

  public onDelete(id: any) {
    this.dynamicTreeService.deletedNodeIds.push(id);
    // this.dynamicTreeService.deleteNodeFormGroup(id);

    if (this.dynamicTreeViewProperties == undefined) {
      console.log('null');
    }
    let parentNodeIds = this.dynamicTreeService.getAllParentIds(id);
    this.deleteNodeById(this.dynamicTreeViewProperties, id);
    this.deleteNodeById(this.nodeJsonData, id);
    this.modifyDeleteVisibilityForParentNode();
    setTimeout(() => {
      this.updateLabels(this.dynamicTreeViewProperties);
      this.dynamicTreeService.deleteNodeFormGroup(id, parentNodeIds);
    }, 100);
  }

  modifyDeleteVisibilityForParentNode() {
    if (this.dynamicTreeViewProperties.nodes != undefined) {
      if (this.dynamicTreeViewProperties.nodes!.length === 1) {
        if (
          this.dynamicTreeViewProperties.nodes
            .at(0)!
            .properties.properties.expansionPanelProperties.at(0)!
            .expansionPanelHeaderProperties!.actionIcons.length == 1
        ) {
          this.dynamicTreeViewProperties.nodes
            .at(0)!
            .properties.properties.expansionPanelProperties.at(
              0,
            )!.expansionPanelHeaderProperties!.actionIcons = [];
        }
      } else {
        if (
          this.dynamicTreeViewProperties.nodes
            .at(0)!
            .properties.properties.expansionPanelProperties.at(0)!
            .expansionPanelHeaderProperties!.actionIcons.length == 0
        ) {
          this.dynamicTreeViewProperties.nodes
            .at(0)!
            .properties.properties.expansionPanelProperties.at(
              0,
            )!.expansionPanelHeaderProperties!.actionIcons = [
            this.fieldsService.getDeleteButton(
              this.dynamicTreeViewProperties.nodes.at(0)?.id,
              this.onDelete.bind(this),
            ),
          ];
        }
      }
    }
  }

  public onFieldNameValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'fieldName', val);
  }

  public async onFieldTypeValueChange(parentId: any, val: any) {
    const parentNode = this.findNodeById(
      this.dynamicTreeViewProperties.nodes ?? [],
      parentId,
    );
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'fieldType', val);

    if (parentNode) {
      this.addRequiredFieldsByFieldType(parentNode, parentId, val);
    }
  }

  public onRequiredValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'required', val);
  }

  public onArrayItemTypeValueChange(parentId: any, val: any) {
    const parentNode = this.findNodeById(
      this.dynamicTreeViewProperties.nodes ?? [],
      parentId,
    );
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'itemType', val);
    if (parentNode) {
      this.addRequiredFieldsByArrayItemType(parentNode, parentId, val);
    }
  }

  public onPatternValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'pattern', val);
  }

  public minLengthValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'minLength', val);
  }
  public maxLengthValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'maxLength', val);
  }
  public minimumValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'minimum', val);
    setTimeout(() => {
      let tempFormNode: FormGroup = this.findFormNodeById(
        this.treeForm.form.controls!['nodes'] as FormArray,
        parentId,
      );
      if (tempFormNode) {
        tempFormNode.controls['maximum'].updateValueAndValidity();
      }
    }, 1000);
  }
  public exclusiveMinimumValueChange(parentId: any, val: any) {
    console.log(
      123,
      `exclusiveMinimumValueChanged at ${parentId}- value: ${val}`,
    );
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'exclusiveMinimum', val);
  }
  public maximumValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'maximum', val);
    setTimeout(() => {
      let tempFormNode: FormGroup = this.findFormNodeById(
        this.treeForm.form.controls!['nodes'] as FormArray,
        parentId,
      );
      if (tempFormNode) {
        tempFormNode.controls['minimum'].updateValueAndValidity();
      }
    }, 1000);
  }
  public exclusiveMaximumValueChange(parentId: any, val: any) {
    // updating json data template for current child
    this.updateJsonDataObj(parentId, 'exclusiveMaximum', val);
  }

  updateJsonDataObj(parentId: any, key: any, value: any) {
    // updating json data template for current child
    var currentJsonDataObj = this.findNodeById(
      this.nodeJsonData.nodes,
      parentId,
    );
    if (currentJsonDataObj != null) {
      currentJsonDataObj[key] = value;
    }
  }
  removeFormDataControlsOfFieldType(
    parentId: any,
    removeItemType: boolean = true,
  ) {
    let currentFormData = this.findFormNodeById(
      this.treeForm.form.controls!['nodes'] as FormArray,
      parentId,
    );
    if (currentFormData.contains('exclusiveMaximum')) {
      currentFormData.removeControl('exclusiveMaximum');
    }
    if (currentFormData.contains('exclusiveMinimum')) {
      currentFormData.removeControl('exclusiveMinimum');
    }
    if (currentFormData.contains('maximum')) {
      currentFormData.removeControl('maximum');
    }
    if (currentFormData.contains('minimum')) {
      currentFormData.removeControl('minimum');
    }
    if (currentFormData.contains('minLength')) {
      currentFormData.removeControl('minLength');
    }
    if (currentFormData.contains('maxLength')) {
      currentFormData.removeControl('maxLength');
    }
    if (currentFormData.contains('pattern')) {
      currentFormData.removeControl('pattern');
    }
    if (currentFormData.contains('itemType') && removeItemType == true) {
      currentFormData.removeControl('itemType');
    }
  }
  removeJsonNodeDataOfFieldType(parentId: any, removeItemType: boolean = true) {
    var currentJsonDataObj = this.findNodeById(
      this.nodeJsonData.nodes,
      parentId,
    );
    if (currentJsonDataObj.hasOwnProperty('exclusiveMaximum')) {
      currentJsonDataObj.exclusiveMaximum = '';
    }
    if (currentJsonDataObj.hasOwnProperty('exclusiveMinimum')) {
      currentJsonDataObj.exclusiveMinimum = '';
    }
    if (currentJsonDataObj.hasOwnProperty('maximum')) {
      currentJsonDataObj.maximum = '';
    }
    if (currentJsonDataObj.hasOwnProperty('minimum')) {
      currentJsonDataObj.minimum = '';
    }
    if (currentJsonDataObj.hasOwnProperty('minLength')) {
      currentJsonDataObj.minLength = '';
    }
    if (currentJsonDataObj.hasOwnProperty('maxLength')) {
      currentJsonDataObj.maxLength = '';
    }
    if (currentJsonDataObj.hasOwnProperty('pattern')) {
      currentJsonDataObj.pattern = '';
    }
    if (
      currentJsonDataObj.hasOwnProperty('itemType') &&
      removeItemType == true
    ) {
      currentJsonDataObj.itemType = '';
    }
  }

  addRequiredFieldsByFieldType(parentNode: any, parentId: any, fieldType: any) {
    let currentNode = parentNode.properties.properties.expansionPanelProperties
      .at(0)
      .expansionPanelContentProperties.at(0);

    // resetting the current node
    currentNode.children.splice(3);
    this.removeFormDataControlsOfFieldType(parentId);
    this.removeJsonNodeDataOfFieldType(parentId);
    parentNode.childAddButtonProperties = null;
    parentNode.showAddChildrenButton = false;
    if (parentNode.nodes != undefined) {
      parentNode.nodes = [];
    }

    let newChildrens: any[];
    switch (fieldType) {
      case JsonFieldTypes.string:
        newChildrens = this.getRequriedFieldsForString(parentId);

        break;

      case JsonFieldTypes.number:
        newChildrens = this.getRequiredFieldsForNumber(parentId);

        break;
      case JsonFieldTypes.boolean:
        console.log(JsonFieldTypes.boolean);
        break;
      case JsonFieldTypes.object:
        // add nested button
        console.log(JsonFieldTypes.object);
        parentNode.showAddChildrenButton = true;
        parentNode.childAddButtonProperties =
          this.fieldsService.propertyFactory.generateProperty(
            ClComponentTypes.button,
          );

        parentNode.childAddButtonProperties =
          this.fieldsService.getAddNestedFieldButtonProperties(() => {
            // this.onClickAddChildren(parentNode,false);
          });
        break;
      default: // default is for array
        newChildrens = [
          this.fieldsService.getArrayItemType(
            parentId,
            this.onArrayItemTypeValueChange.bind(this),
          ),
        ];
        break;
    }
    setTimeout(() => {
      if (newChildrens) {
        currentNode.children.push(...newChildrens);
        if (fieldType == JsonFieldTypes.number) {
          this.setDefaultValuesForExclusiveMinMax(parentId);
        }
      }
    });
  }

  addRequiredFieldsByArrayItemType(
    parentNode: any,
    parentId: any,
    fieldType: any,
  ) {
    let currentNode = parentNode.properties.properties.expansionPanelProperties
      .at(0)
      .expansionPanelContentProperties.at(0);

    // resetting the current node
    currentNode.children.splice(4);
    this.removeFormDataControlsOfFieldType(parentId, false);
    this.removeJsonNodeDataOfFieldType(parentId, false);
    parentNode.childAddButtonProperties = null;
    parentNode.showAddChildrenButton = false;
    if (parentNode.nodes != undefined) {
      parentNode.nodes = [];
    }

    let newChildrens: any[];
    switch (fieldType) {
      case JsonFieldTypes.string:
        newChildrens = this.getRequriedFieldsForString(parentId);
        break;

      case JsonFieldTypes.number:
        newChildrens = this.getRequiredFieldsForNumber(parentId);
        break;
      case JsonFieldTypes.boolean:
        console.log(JsonFieldTypes.boolean);
        break;
      case JsonFieldTypes.object:
        parentNode.showAddChildrenButton = true;
        parentNode.childAddButtonProperties =
          this.fieldsService.propertyFactory.generateProperty(
            ClComponentTypes.button,
          );
        parentNode.childAddButtonProperties =
          this.fieldsService.getAddArrayItemButtonProperties(() => {
            // this.onClickAddChildren(parentNode);
          });
        break;
      default:
        console.log('Itemtype case not found');
        break;
    }
    setTimeout(() => {
      if (newChildrens) {
        currentNode.children.push(...newChildrens);
        if (fieldType == JsonFieldTypes.number) {
          this.setDefaultValuesForExclusiveMinMax(parentId);
        }
      }
    });
  }

  setDefaultValuesForExclusiveMinMax(parentId: any) {
    setTimeout(() => {
      let tempFormNode = this.findFormNodeById(
        this.treeForm.form.controls!['nodes'] as FormArray,
        parentId,
      );
      if (tempFormNode) {
        tempFormNode.controls['exclusiveMaximum'].setValue('Yes');
        tempFormNode.controls['exclusiveMinimum'].setValue('Yes');
        this.updateJsonDataObj(parentId, 'exclusiveMaximum', 'Yes');
        this.updateJsonDataObj(parentId, 'exclusiveMinimum', 'Yes');
      }
    });
  }

  getRequriedFieldsForString(parentId: any) {
    var newChildrens = [
      this.fieldsService.getPattern(
        parentId,
        this.onPatternValueChange.bind(this),
      ),
      this.fieldsService.getMinLength(
        parentId,
        this.minLengthValueChange.bind(this),
      ),
      this.fieldsService.getMaxLength(
        parentId,
        this.maxLengthValueChange.bind(this),
      ),
    ];
    return cloneDeep(newChildrens);
  }

  getRequiredFieldsForNumber(parentId: any) {
    var newChildrens = [
      this.fieldsService.getMinimum(
        parentId,
        this.minimumValueChange.bind(this),
      ),
      this.fieldsService.getExclusiveMinimum(
        parentId,
        this.exclusiveMinimumValueChange.bind(this),
      ),
      this.fieldsService.getMaximum(
        parentId,
        this.maximumValueChange.bind(this),
      ),
      this.fieldsService.getExclusiveMaximum(
        parentId,
        this.exclusiveMaximumValueChange.bind(this),
      ),
    ];
    return cloneDeep(newChildrens);
  }

  findNodeById(tree: any, parentId: any): any | null {
    for (const node of tree) {
      if (node.id === parentId) {
        return node;
      }
      if (node.nodes != undefined) {
        const found = this.findNodeById(node.nodes, parentId);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  findFormNodeById(tree: any, parentId: any): any | null {
    for (const node of tree.controls) {
      if (parentId in node.controls) {
        return node;
      }
      if (node.controls.nodes != undefined) {
        const found = this.findFormNodeById(node.controls.nodes, parentId);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  deleteNodeById(node: any, deletedId: string): Node | null {
    // If the current node is the one to delete, return null
    if (node.id === deletedId) {
      return null;
    }

    // If 'nodes' is undefined, return the current node as is
    if (!node.nodes) {
      return node;
    }

    // Traverse and filter child nodes
    node.nodes = node.nodes
      .map((child: any) => this.deleteNodeById(child, deletedId)) // Recursively handle child nodes
      .filter((child: any) => child !== null) as Node[]; // Remove null values (deleted nodes)

    return node; // Return the updated node
  }

  updateLabels(node: any): void {
    // If the node has children
    if (node.nodes && node.nodes.length > 0) {
      const hasLabels = node.nodes.some(
        (child: any) =>
          child.properties.properties.expansionPanelProperties.at(0)
            .expansionPanelHeaderProperties?.label,
      );
      if (hasLabels) {
        // Determine the label prefix from the first child with a label
        // const prefixMatch = node.nodes
        // .find((child:any) => 'expansionPanelHeaderProperties.label' in child.properties.properties.expansionPanelProperties)
        // ?.label?.match(/^[^\d]+/); // Match non-digit characters at the start of the label

        const firstLabel = node.nodes
          .find(
            (child: any) =>
              child.properties.properties.expansionPanelProperties.at(0)
                .expansionPanelHeaderProperties?.label,
          )
          ?.properties.properties.expansionPanelProperties.at(0)
          .expansionPanelHeaderProperties?.label;

        const prefixMatch = firstLabel?.match(/^[^\d]+/); // Match non-digit characters at the start
        const prefix = prefixMatch ? prefixMatch[0].trim() : 'Field'; // Default to "Field" if no match

        // Update labels based on the index for children with labels
        node.nodes.forEach((child: any, index: number) => {
          if (
            child.properties.properties.expansionPanelProperties.at(0)
              .expansionPanelHeaderProperties
          ) {
            child.properties.properties.expansionPanelProperties.at(
              0,
            ).expansionPanelHeaderProperties.label = `${prefix} ${index + 1}`;
          }
        });
      }

      // Recursively process child nodes
      node.nodes.forEach((child: any) => this.updateLabels(child));
    }
  }

  onClickPreview() {
    this.previewJson = JSON.stringify(
      this.generatePreview(this.nodeJsonData),
      null,
      1,
    );
    this.addjsonschemaService.codeViewProperties.code = this.previewJson;
  }

  generatePreview(fields: any) {
    const schemaObject: {
      type: string;
      properties: { [key: string]: { [key: string]: any } };
      required?: string[];
    } = {
      type: 'object',
      properties: {},
      required: [],
    };

    if (fields.nodes) {
      fields.nodes.forEach((field: any) => {
        schemaObject.properties[field.fieldName] = { type: field.fieldType };

        if (field.required == 'Yes') {
          schemaObject.required?.push(field.fieldName);
        }

        switch (field.fieldType) {
          case JsonFieldTypes.string:
            if (field.pattern)
              schemaObject.properties[field.fieldName]['pattern'] =
                field.pattern;
            if (field.minLength)
              schemaObject.properties[field.fieldName]['minLength'] = parseInt(
                field.minLength,
              );
            if (field.maxLength)
              schemaObject.properties[field.fieldName]['maxLength'] = parseInt(
                field.maxLength,
              );
            break;
          case JsonFieldTypes.number:
            if (field.exclusiveMinimum) {
              if (field.exclusiveMinimum === 'Yes' && field.minimum) {
                schemaObject.properties[field.fieldName]['exclusiveMinimum'] =
                  parseFloat(field.minimum);
              } else if (field.minimum) {
                schemaObject.properties[field.fieldName]['minimum'] =
                  parseFloat(field.minimum);
              }
            }

            if (field.exclusiveMaximum) {
              if (field.exclusiveMaximum === 'Yes' && field.maximum) {
                schemaObject.properties[field.fieldName]['exclusiveMaximum'] =
                  parseFloat(field.maximum);
              } else if (field.maximum) {
                schemaObject.properties[field.fieldName]['maximum'] =
                  parseFloat(field.maximum);
              }
            }

            break;
          case JsonFieldTypes.boolean:
            break;
          case JsonFieldTypes.object:
            schemaObject.properties[field.fieldName] =
              this.generatePreview(field);

            break;
          case JsonFieldTypes.array:
            const itemsSchema: any = { type: field.itemType };
            if (
              [
                JsonFieldTypes.string,
                JsonFieldTypes.number,
                JsonFieldTypes.boolean,
              ].includes(field.itemType)
            ) {
              // Primitive type constraints
              if (field.itemType === JsonFieldTypes.string) {
                if (field.minLength) itemsSchema['minLength'] = field.minLength;
                if (field.maxLength) itemsSchema['maxLength'] = field.maxLength;
                if (field.pattern) itemsSchema['pattern'] = field.pattern;
              } else if (field.itemType === JsonFieldTypes.number) {
                if (field.exclusiveMinimum) {
                  if (field.exclusiveMinimum === 'Yes' && field.minimum) {
                    schemaObject.properties[field.fieldName][
                      'exclusiveMinimum'
                    ] = parseFloat(field.minimum);
                  } else if (field.minimum) {
                    schemaObject.properties[field.fieldName]['minimum'] =
                      parseFloat(field.minimum);
                  }
                }

                if (field.exclusiveMaximum) {
                  if (field.exclusiveMaximum === 'Yes' && field.maximum) {
                    schemaObject.properties[field.fieldName][
                      'exclusiveMaximum'
                    ] = parseFloat(field.maximum);
                  } else if (field.maximum) {
                    schemaObject.properties[field.fieldName]['maximum'] =
                      parseFloat(field.maximum);
                  }
                }
              }
              schemaObject.properties[field.fieldName]['items'] = itemsSchema;
            } else if (
              field.itemType === JsonFieldTypes.object &&
              field.nodes
            ) {
              // Object type array
              schemaObject.properties[field.fieldName]['items'] =
                this.generatePreview(field);
            }
            break;
          default:
            console.log('Itemtype case not found');
            break;
        }
      });
    }

    if (schemaObject.required?.length === 0) {
      delete schemaObject.required;
    }

    return schemaObject;
  }

  onClickSave() {
    this.saveSchema();
  }

  public saveSchema() {
    var body = {
      schemaName: this.form_41Vm.formValue.jsonSchemaName,
      schemaConfig: this.generatePreview(this.nodeJsonData),
      tenantCode: GlobalVariables.tenantCode,
      status: GlobalVariables.status,
      dmlBy: GlobalVariables.dmlBy,
    };

    if (this.validationSchemaId) {
      (body as any)['validationSchemasId'] = this.validationSchemaId;
    }
    this.addjsonschemaService.saveDisabled.set(true);
    this.apiClient
      .saveDataApi(
        ApiVariables.validation_schema_url,
        body,
        this.validationSchemaId,
      )
      .subscribe({
        next: (data: any) => {
          if (data.status == '0000') {
            this.addjsonschemaService.saveDisabled.set(false);
            this.commonToastService.showSuccessToast(
              `Json schema ${this.form_41Vm.formValue.jsonSchemaName} has been ${this.validationSchemaId ? 'updated and saved' : 'added'}  successfully.`,
            );
            this.router.navigate([RoutingVariables.jsonSchemaListRoute]);
          } else {
            this.addjsonschemaService.saveDisabled.set(false);

            var jsonKeys = Object.keys(data.detail);

            this.commonToastService.showErrorToast(
              data.detail[jsonKeys.toString()] ?? 'Failed',
            );
          }
        },
        error: (err: any) => {
          this.addjsonschemaService.saveDisabled.set(false);

          console.log(err);
          this.commonToastService.showErrorToast(err.toString());
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
