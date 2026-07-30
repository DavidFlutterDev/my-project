import { MatIconModule } from '@angular/material/icon';
import { Input, OnInit, inject, Output, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { ClIconProperties } from '@clay/ui-components/basic';
import { ClComponentPropertyFactory } from '@clay/ui-components/property-factory';
import { DataMapperNode } from '../properties/data-mapper.properties';
import { DataMapperService } from '../data-mapper.service';
import { DOMHelper } from '../../../utils/DOM-helper';
@Component({
  standalone: true,
  selector: 'app-node',
  templateUrl: './node.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    :host {
      display: flex !important;
      width: 100% !important;
    }
  `],
  imports: [
    MatIconModule,
  ],
})
export class NodeComponent implements OnInit {
  @Input({ required: true })
  public node!: DataMapperNode;

  @Input({ required: false })
  public showAddIcon!: boolean;

  @Input({ required: false })
  public showDeleteIcon!: boolean;

  @Input({ required: false })
  public showError!: boolean;

  @Input({ required: false })
  public cssClasses!: string;

  @Output()
  public nodeClick: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();
  @Output()
  public addNode: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();
  @Output()
  public deleteNode: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();
  @Output()
  public showErrors: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();

  private readonly dataMapperService: DataMapperService = inject(DataMapperService);
  private readonly _propertyFactory: ClComponentPropertyFactory = inject(ClComponentPropertyFactory);

  protected readonly addIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);
  protected readonly deleteIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);
  protected readonly viewOnIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);
  protected readonly viewOffIconProperties: ClIconProperties = this._propertyFactory.generateProperty(ClComponentTypes.icon);



  ngOnInit(): void {
    this.setIconProperties();
  }

  private setIconProperties() {
    this.addIconProperties.tooltip = "Add Transformation";
    this.addIconProperties.iconName = 'heroicons_outline:plus-circle';
    this.addIconProperties.style!.cssClasses = 'text-primary icon-size-5';
    this.addIconProperties.onIconClicked = this.onAdd.bind(this);

    this.deleteIconProperties.iconName = 'heroicons_outline:trash';
    this.deleteIconProperties.tooltip = "Delete Transformation";
    this.deleteIconProperties.style!.cssClasses = 'text-warn icon-size-5';
    this.deleteIconProperties.onIconClicked = this.onDelete.bind(this);
  }

  protected onAdd() {
    this.addNode.emit(this.node);
  }

  protected onDelete() {
    this.deleteNode.emit(this.node);
  }

  onNodeClick(){
    this.nodeClick.emit(this.node);
  }

  protected onShowErrors() {
    this.showErrors.emit(this.node);
  }

  protected showAddIconInUI(node: DataMapperNode): boolean {
    return this.dataMapperService.activeMapping?.sources[0].id === node.id
  }

  protected getFormattedLabel(label: string): string {
    return DOMHelper.replaceUnderScoreWithSpace(label);
  }
}
