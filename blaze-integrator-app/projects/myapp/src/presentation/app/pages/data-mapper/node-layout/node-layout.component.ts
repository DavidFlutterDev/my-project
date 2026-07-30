import { MatIconModule } from '@angular/material/icon';
import {
  Input, OnInit, inject, Output, Component, EventEmitter,
  ViewEncapsulation, ElementRef} from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { DataMapperNode } from '../properties/data-mapper.properties';
import { DataMapperService } from '../data-mapper.service';
import { CommonModule } from '@angular/common';
import { DOMHelper } from '../../../utils/DOM-helper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-node-layout',
  templateUrl: './node-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    :host {
      display: flex !important;
      width: 100% !important;
    }
    .input-top,
    .output-bottom {
      @apply size-1 rounded-full bg-gray-800 self-center;
    }
  `],
  imports: [
    CommonModule,
    MatIconModule,
    NodeComponent
  ],
})
export class NodeLayoutComponent implements OnInit {
  @Input({ required: true })
  public pNode!: DataMapperNode;

  @Input({ required: true })
  public isOutputNode!: boolean;

  @Input({ required: true })
  public svgContainerRef!: ElementRef;

  @Input({ required: true })
  public showAddIcon!: boolean;

  @Input({ required: true })
  public showDeleteIcon!: boolean;

  @Input({ required: false })
  public nodeIndex: number = 0;

  @Input({ required: false })
  public totalNodes: number = 0;

  @Output()
  public addNode: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();
  @Output()
  public nodeClick: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();
  @Output()
  public deleteNode: EventEmitter<DataMapperNode> = new EventEmitter<DataMapperNode>();

  private readonly dataMapperService: DataMapperService = inject(DataMapperService);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataMapperService.drawLineSubject.subscribe(() => {
      this.drawAutoConnections();
    })
  }

  protected onAddNode(node: DataMapperNode) {
    this.addNode.emit(node);
  }

  protected onDeleteNode(node: DataMapperNode) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { itemName: `\"${node.label}\" node` }, // Pass any data needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.deleteNode.emit(node);
      } else {
        console.log('Delete operation cancelled');
      }
    });
  }

  protected onNodeClick(node: DataMapperNode) {
    this.nodeClick.emit(node);
  }

  private drawAutoConnections(): void {
    const svgElement: HTMLElement = this.svgContainerRef.nativeElement;
    const containerRect: DOMRect = svgElement.getBoundingClientRect();

    const containerTopOffset: number = containerRect.top;
    const containerLeftOffset: number = containerRect.left;

    // Group map drawing
    if (this.pNode && this.pNode.children && this.pNode.type === 'group') {
      // Connect group child nodes to each other
      this.connectChildren(this.pNode, containerLeftOffset, containerTopOffset);
    }
    // Switch Map drawing
    if (this.pNode && this.pNode.children && this.pNode.type === 'tree') {
      const sourceElement: HTMLElement | null = document.getElementById(`switch-output-bottom-${this.pNode.id}`);
      if (sourceElement) {
        const switchParentRect: DOMRect = sourceElement.getBoundingClientRect();
        const switchOutput = {
          x: switchParentRect.left + 2 - containerLeftOffset, // Adjust based on container position
          y: switchParentRect.bottom - containerTopOffset // Adjust based on container position
        };

        // Connect switch parent to cases nodes to each other
        for (let i: number = 0; i < this.pNode.children.length; i++) {
          const caseNodeEle: HTMLElement | null = document.getElementById(`input-top-${this.pNode.children[i].id}`);
          if (caseNodeEle) {
            const caseRect: DOMRect = caseNodeEle.getBoundingClientRect();
            const caseOutput = {
              x: caseRect.left + 2 - containerLeftOffset, // Adjust based on container position
              y: caseRect.top - containerTopOffset// Adjust based on container position
            };

            if (i === 0) {
              this.dataMapperService.drawLine(switchOutput.x, switchOutput.y, caseOutput.x, caseOutput.y);
            } else {
              this.dataMapperService.drawCurvedLine(switchOutput.x, switchOutput.y, caseOutput.x, caseOutput.y);
            }
          }
          this.connectChildren(this.pNode.children[i], containerLeftOffset, containerTopOffset)
        }
      }
    }
  }

  private connectChildren(pNode: DataMapperNode, containerLeftOffset: number, containerTopOffset: number) {
    if (pNode.children) {
      for (let i: number = 0; i < pNode.children.length - 1; i++) {
        const currentProcessorEle: HTMLElement | null = document.getElementById(`output-bottom-${pNode.children[i].id}`);
        const nextProcessorEle: HTMLElement | null = document.getElementById(`input-top-${pNode.children[i + 1].id}`);

        if (currentProcessorEle && nextProcessorEle) {
          const currentProcessor: DOMRect = currentProcessorEle.getBoundingClientRect();
          const nextProcessor: DOMRect = nextProcessorEle.getBoundingClientRect();

          const currentProcessorOutput = {
            x: currentProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
            y: currentProcessor.bottom - containerTopOffset // Adjust based on container position
          };

          const nextProcessorInput = {
            x: nextProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
            y: nextProcessor.top - containerTopOffset // Adjust based on container position
          };
          // Draw line from current processor to next processor (bottom to top)
          this.dataMapperService.drawLine(currentProcessorOutput.x, currentProcessorOutput.y, nextProcessorInput.x, nextProcessorInput.y, pNode.label?.toLowerCase() === 'fallback');
        }
      }
    }
  }

  protected getFormattedLabel(label: string): string {
    return DOMHelper.replaceUnderScoreWithSpace(label);
  }
}
