import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  inject, ViewChild, Component, ElementRef,
  HostListener, AfterViewInit, ViewEncapsulation, ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NodeComponent } from './node/node.component';
import { DataMapperNode, DataMapping } from './properties/data-mapper.properties';
import { DataMapperService } from './data-mapper.service';
import { AddProcessorComponent } from './add-processor/add-processor.component';
import { CommonToastService } from '../common-services/common-toast.services';
import { ComponentConfigComponent } from './component-config/component-config.component';
import { ApiClient } from 'projects/myapp/src/api/api.client.services';
import { ApiVariables } from '../../utils/api.variables';
import { NodeLayoutComponent } from './node-layout/node-layout.component';
import { cloneDeep, findIndex } from 'lodash';
@Component({
  standalone: true,
  selector: 'app-data-mapper',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './data-mapper.component.scss',
  templateUrl: './data-mapper.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    NodeComponent,
    NodeLayoutComponent
  ],
})
export class DataMapperComponent implements OnInit, AfterViewInit {
  private _document = inject(DOCUMENT);

  @Input({ required: false })
  public bodyCssClasses: string = '';

  @Input({ required: true })
  public dataMapperJson?: DataMapping;

  @Output()
  public dataMapperJsonUpdated: EventEmitter<DataMapping> = new EventEmitter<DataMapping>();

  @ViewChild('svgContainer', { static: false }) svgContainerRef!: ElementRef;

  private readonly _dialog: MatDialog = inject(MatDialog);
  protected readonly dataMapperService: DataMapperService = inject(DataMapperService);

  protected dataMap: DataMapping = {
    id: '',
    sources: [],
    processes: []
  };

  // protected topValue = 0;
  // protected leftValue = 0;
  public scale: number = 1;

  constructor(private readonly cdr: ChangeDetectorRef, private commonToastService: CommonToastService,
    private apiClient: ApiClient) { }

  ngOnInit(): void {
    if (this.dataMapperJson && this.dataMapperJson.sources) {
      this.dataMap = cloneDeep(this.dataMapperJson);
    }
  }

  ngAfterViewInit(): void {
    if (this.dataMap) {
      this.drawConnections();
      this.cdr.detectChanges();
    }
  }

  protected drawConnections() {
    setTimeout(() => {
      this.drawAutoConnections(this.dataMap);
    }, 100);
  }

  private drawAutoConnections(dataMap?: DataMapping): void {
    if (!dataMap) return;

    // Clear previous lines (if necessary)
    const svgElement: HTMLElement = this.svgContainerRef.nativeElement;
    svgElement.innerHTML = ''; // Clear previous lines

    // Get the bounding box for the SVG container (or dialog)
    const containerRect: DOMRect = svgElement!.getBoundingClientRect();
    const containerLeftOffset: number = containerRect!.left;
    const containerTopOffset: number = containerRect!.top;

    this.dataMapperService.connectInputToProcessors(containerLeftOffset, containerTopOffset, dataMap);
  }


  @HostListener("window:scroll", []) onWindowScroll() {
    this.drawAutoConnections(this.dataMap);
  }

  protected onAddProcess(sourceNode: DataMapperNode) {
    this._dialog.open(AddProcessorComponent, {
      width: '610px', height: 'auto',
      data: {
        node: sourceNode
      }
    }).afterClosed()
      .subscribe((processNode: DataMapperNode) => {
        if (processNode.type === 'tree') {
          this.openComponentConfigDialog(processNode);
        } else {
          this.handleProcessAddition(processNode, sourceNode);
        }
      });
  }

  handleProcessAddition(processNode: DataMapperNode, sourceNode: DataMapperNode) {
    this.drawConnections();
    if (processNode) {

      this.dataMap.processes ??= [];
      if (sourceNode.type === 'group' || sourceNode.type === 'tree' || sourceNode.type === 'treeCondition') {
        const groupObj = this.dataMapperService.findObjectById(this.dataMap.processes, sourceNode.id);
        if (groupObj) {
          groupObj.children?.push(processNode);
        }
      } else {
        this.dataMap.processes.push(processNode);
      }

      this.drawConnections();
      if (processNode.type === 'single') {
        this.getComponentDetails(processNode);
      }
    }
  }

  /**
   * Steps to delete a transformation
   *
   * Step 1: Run a loop on data mapping array
   * Step 2: find the transformation which was clicked in each data maps transformation
   *
   * @param processNode
   */
  protected onDeleteProcess(processNode: DataMapperNode) {
    if (this.dataMap.processes && this.dataMap.processes.length > 0) {
      this.deleteNodeById(this.dataMap.processes, processNode.id);
      this.drawConnections();

      console.log(283, this.dataMap)
      this.dataMapperJsonUpdated.emit(this.dataMap);
    }
  }

  deleteNodeById(list: DataMapperNode[], targetId: string) {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];

      // If the target node is found
      if (node.id === targetId) {
        list.splice(i, 1); // Remove the node from the array
        return true; // Exit once node is deleted
      }

      // If the node has children, recursively call the function
      if (node.children && node.children.length > 0) {
        if (this.deleteNodeById(node.children, targetId)) {
          return true; // If found and deleted in children, exit
        }
      }
    }
    return false; // Node not found in the current tree or its children
  }

  protected onClickAddProcessor() {
    if (this.dataMap?.sources[0]) {
      this.onAddProcess(this.dataMap.sources[0]);
    }
  }

  nodeClick(node: any) {
    this.getComponentDetails(node);
  }

  getComponentDetails(node: any) {
    this.apiClient.getDetailsApi(ApiVariables.component_details_url + `?name=${node.label}&type=${node.category?.toLowerCase()}`).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          if (data.detail?.formType === 'DYNAMIC') {
            node.templateJson = data.detail.formConfig;
          }
          if (data.detail?.formType !== 'NONE') {
            this.openComponentConfigDialog(node);
          }
        } else {
          this.commonToastService.showErrorToast(data?.detail?.toString());
        }
      },
      error: (err: any) => {
        this.commonToastService.showErrorToast(err.toString());
      },
    });
  }

  openComponentConfigDialog(node: any) {
    let componentConfigInputData: any = {};
    if (node.templateJson) {
      componentConfigInputData = {
        node: node,
        templateData: {
          templateJson: node.templateJson,
        }
      }
    } else {
      const component: any = this.dataMapperService.getComponentClass(node.label, node.category);
      componentConfigInputData = {
        node: node,
        templateData: {
          component: component,
          componentProperties: {
            inputs: [
              { key: 'node', value: node },
            ],
            outputs: [
              { functionName: "onSubmitClicked" }
            ]
          }
        }
      }
    }

    this._dialog.open(ComponentConfigComponent, {
      width: 'auto', height: 'auto',
      data: componentConfigInputData
    }).afterClosed().subscribe((componentDetails: DataMapperNode) => {
      console.log('data-mapper-component :: componentDetails', componentDetails);
      if (componentDetails) {
        node.isDataValid = componentDetails.isDataValid;
        node.data = componentDetails.data;
        if (componentDetails.type === 'tree' && componentDetails.data) {
          this.updateTreeConditions(node);
        }
      }
      console.log(283, this.dataMap)
      this.dataMapperJsonUpdated.emit(this.dataMap);
    });
  }

  updateTreeConditions(node: DataMapperNode) {
    if (node.data) {
      let treeConditions: { id: string, label: string }[] = node.data?.conditions ?? [];
      if (this.dataMap.processes) {
        const groupObj = this.dataMapperService.findObjectById(this.dataMap.processes, node.id);
        if (groupObj && node.children) {
          const currentChildren: DataMapperNode[] = cloneDeep(node.children);
          node.children = [];

          for (const condition of treeConditions) {
            const childIndex = findIndex(currentChildren, function (o) { return o.id == condition.id; });
            if (childIndex === -1) {
              const child: DataMapperNode = {
                type: 'treeCondition',
                id: condition.id,
                label: condition.label,
                children: [],
                parentId: node.id,
              };
              this.handleProcessAddition(child, node);
            } else {
              const child: DataMapperNode = {
                type: 'treeCondition',
                id: condition.id,
                label: condition.label,
                children: currentChildren[childIndex].children,
                parentId: node.id,
              };
              this.handleProcessAddition(child, node);
            }
          }
        } else if (this.dataMap && this.dataMap.sources[0]) {
          node.children = [];
          for (const condition of treeConditions) {
            node.children.push({
              type: 'treeCondition',
              id: condition.id,
              label: condition.label,
              children: [],
              parentId: node.id,
            });
          }
          this.handleProcessAddition(node, this.dataMap.sources[0]);
        }
      }
    }
  }

  onShowErrors(node: any) {
  }

  zoomIn() {
    this.scale = this.scale > 0.1 ? this.scale - 0.1 : 0.1; // Decrease scale by 0.1 for zoom out
    this.drawConnections();
    // this.adjustContainer(true);
  }

  zoomOut() {
    if (this.scale < 1) {
      this.scale += 0.1; // Increase scale by 0.1 for zoom in
      this.drawConnections();
      // this.adjustContainer(false);
    }
  }

  fitToScreen() {
    if (!this._document.fullscreenEnabled) {
      console.log('Fullscreen is not available in this browser.');
      return;
    }

    // Check if the fullscreen is already open
    const fullScreen = this._document.fullscreenElement;

    // Toggle the fullscreen
    if (fullScreen) {
      this._document.exitFullscreen();
    } else {
      this._document.documentElement.requestFullscreen().catch(() => {
        console.error('Entering fullscreen mode failed.');
      });
    }
  }

  // adjustContainer(inOut: boolean) {
  //   const parentEle: HTMLElement | null = document.getElementById('parent');
  //   const parentRect: DOMRect = parentEle!.getBoundingClientRect();

  //   const dataContainerEle: HTMLElement | null = document.getElementById('dataContainer');
  //   const dataContainerRect: DOMRect = dataContainerEle!.getBoundingClientRect();

  //   if (inOut) {
  //     setTimeout(() => {
  //       this.topValue = this.topValue + Math.round(parentRect.top - dataContainerRect.top);
  //       this.leftValue = this.leftValue - 100 + Math.round(parentRect.left - dataContainerRect.left);
  //     }, 10);
  //   } else {
  //     setTimeout(() => {
  //       this.topValue = this.topValue - Math.round(parentRect.top - dataContainerRect.top);
  //       this.leftValue = this.leftValue + 100 - Math.round(parentRect.left - dataContainerRect.left);
  //     }, 10);
  //   }
  // }

}
