import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { AwsS3ProcessorComponent } from './components/awss3processor/awss3processor.component';
import { EncryptProcessorsComponent } from './components/encryptprocessors/encryptprocessors.component';
import { HttpClientProcessorComponent } from './components/httpclientprocessor/httpclientprocessor.component';
import { HttpControllerProcessorComponent } from './components/httpcontrollerprocessor/httpcontrollerprocessor.component';
import { HttpServerprocessorComponent } from './components/httpserverprocessor/httpserverprocessor.component';
import { JsonProcessorComponent } from './components/jsonprocessor/jsonprocessor.component';
import { KafkaInputComponent } from './components/kafkainput/kafkainput.component';
import { KafkaOutputComponent } from './components/kafkaoutput/kafkaoutput.component';
import { LogProcessorComponent } from './components/logprocessor/logprocessor.component';
import { MultipartDataformProcessorComponent } from './components/multipartdataformprocessor/multipartdataformprocessor.component';
import { SetConfigProcessorComponent } from './components/setconfigprocessor/setconfigprocessor.component';
import { SftpProcessorComponent } from './components/sftpprocessor/sftpprocessor.component';
import { SqlProcessorComponent } from './components/sqlprocessor/sqlprocessor.component';
import { SwitchProcessorComponent } from './components/switchprocessor/switchprocessor.component';
import { DataMapping, DataMapperNode } from './properties/data-mapper.properties';
import { DataValidatorProcessorComponent } from './components/datavalidatorprocessor/datavalidatorprocessor.component';
import { cloneDeep } from 'lodash';
import { RedisProcessorComponent } from './components/redisprocessor/redisprocessor.component';

@Injectable({ providedIn: 'root' })
export class DataMapperService {

  public drawLineSubject: Subject<any> = new Subject<any>();

  public activeMapping: DataMapping | undefined;

  public generateUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
      });
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number, iconLine?: boolean) {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const line: SVGLineElement = document.createElementNS(svgNamespace, 'line');

    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());

    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '2');

    document.querySelector('.line-connector')?.appendChild(line);
    if (iconLine) {
      // Calculate the center of the line
      const centerX = (x1 + x2) / 2; // Midpoint x
      const centerY = (y1 + y2) / 2; // Midpoint y (same because it's a horizontal line)
      // Create an image as an icon
      const iconImage: SVGImageElement = document.createElementNS(svgNamespace, 'image');
      iconImage.setAttribute('x', (centerX - 10).toString()); // Adjust to center the image
      iconImage.setAttribute('y', (centerY - 10).toString()); // Adjust to center the image
      iconImage.setAttribute('width', '20'); // Image width
      iconImage.setAttribute('height', '20'); // Image height
      iconImage.setAttribute('href', './assets/images/data-mapper/if-fails.png');
      // Create a tooltip (SVGTitleElement)
      // const tooltip: SVGTitleElement = document.createElementNS(svgNamespace, 'title');
      // tooltip.innerHTML= 'If fails'; // Tooltip text
      // // Append the tooltip to the image (this will display when hovering over the image)
      // iconImage.appendChild(tooltip);

      // iconImage.setAttribute('matTooltip', 'If fails');
      iconImage.setAttribute('title', 'If fails');

      document.querySelector('.line-connector')?.appendChild(iconImage);
    }
  }

  public drawCurvedLine(x1: number, y1: number, x2: number, y2: number) {
    const path: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // Calculate the control points for the curve
    const controlPoint1 = { x: x1 + 150, y: y1 }; // Control point closer to the last processor
    const controlPoint2 = { x: x2 - 150, y: y2 }; // Control point closer to the output node

    // Create the path for a cubic Bezier curve
    const d = `M ${x1} ${y1} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${x2} ${y2}`;

    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke-dasharray', '2');
    document.querySelector('.line-connector')?.appendChild(path);
  }

  findObjectById(arr: DataMapperNode[], targetId: string): DataMapperNode | null {
    for (const item of arr) {
      // Check if the current item matches the target ID
      if (item.id === targetId) {
        return item;
      }

      // If the item has nested children, recursively search them
      if (item.children) {
        const foundInChildren = this.findObjectById(item.children, targetId);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }

    return null; // Return null if the object with the target ID is not found
  }

  connectInputToProcessors(containerLeftOffset: number, containerTopOffset: number, dataMap: DataMapping) {
    const processorNodes: DataMapperNode[] = cloneDeep(dataMap.processes!);

    for (const sourceNode of dataMap.sources) {
      // Get the HTML elements for the source and destination nodes
      const sourceElement: HTMLElement | null = document.getElementById(`output-right-${sourceNode.id}`);

      // If both source and destination elements exist, calculate positions
      if (sourceElement) {
        const inputRect: DOMRect = sourceElement.getBoundingClientRect();
        // Calculate exact center points for input and output nodes
        const inputCenter = {
          x: inputRect.right - containerLeftOffset, // Right side of the input node
          y: inputRect.top - containerTopOffset // Vertical center of the input node
        };

        if (processorNodes.length > 0) {
          // Connect input to first processor node
          const firstProcessorEle: HTMLElement | null = document.getElementById(`input-left-${processorNodes[0].id}`);
          if (firstProcessorEle) {
            const firstProcessor: DOMRect = firstProcessorEle.getBoundingClientRect();

            const firstProcessorInput = {
              x: firstProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
              y: firstProcessor.top - containerTopOffset // Adjust based on container position
            };

            // Draw line from input node to first processor node (left side)
            this.drawLine(inputCenter.x, inputCenter.y, firstProcessorInput.x, firstProcessorInput.y);
          }

          // Connect processor nodes to each other
          this.connectProcessorNodes(containerLeftOffset, containerTopOffset, processorNodes);
        }

        if (dataMap.destination) {
          const destinationNode: DataMapperNode = dataMap.destination;
          const destinationElement: HTMLElement | null = document.getElementById(`input-left-${destinationNode.id}`);
          if (destinationElement) {
            const outputRect: DOMRect = destinationElement.getBoundingClientRect();
            const outputCenter = {
              x: outputRect.left + 2 - containerLeftOffset, // Left side of the output node
              y: outputRect.top - containerTopOffset // Vertical center of the output node
            };
            if (inputRect && outputRect) {
              // Check if there are processor nodes
              if (processorNodes.length === 0) {
                // No processor nodes, directly connect input node to output node
                this.drawLine(inputCenter.x, inputCenter.y, outputCenter.x, outputCenter.y);
                this.drawLineSubject.next('');
                return; // Exit the function early since no processors are present
              } else {
                const lastProcessorNode = processorNodes[processorNodes.length - 1];
                if (lastProcessorNode.type === 'tree' && lastProcessorNode.children) {
                  for (let treeCondition of lastProcessorNode.children) {
                    const lastProcessorEle: HTMLElement | null = document.getElementById(`output-right-${treeCondition.id}`);
                    this.connectLastNodesToOutPut(lastProcessorEle, containerLeftOffset, containerTopOffset, outputCenter);
                  }
                } else {
                  const lastProcessorEle: HTMLElement | null = document.getElementById(`output-right-${processorNodes[processorNodes.length - 1].id}`);
                  this.connectLastNodesToOutPut(lastProcessorEle, containerLeftOffset, containerTopOffset, outputCenter);
                }
              }
            }
          }
        }
      }
    }
  }

  private connectProcessorNodes(containerLeftOffset: number, containerTopOffset: number, processorNodes: any[]) {
    for (let i: number = 0; i < processorNodes.length - 1; i++) {
      const nextProcessorEle: HTMLElement | null = document.getElementById(`input-top-${processorNodes[i + 1].id}`);
      if (nextProcessorEle) {
        const nextProcessor: DOMRect = nextProcessorEle.getBoundingClientRect();
        const nextProcessorInput = {
          x: nextProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
          y: nextProcessor.top - containerTopOffset // Adjust based on container position
        };

        if (processorNodes[i].type === 'tree' && processorNodes[i].children) {
          for (let treeCondition of processorNodes[i].children) {
            if (treeCondition.children && treeCondition.children.length > 0) {
              const treeConditionEle: HTMLElement | null = document.getElementById(`output-bottom-${treeCondition.id}`);
              if (treeConditionEle) {
                const currenttreeCondition: DOMRect = treeConditionEle.getBoundingClientRect();
                const currenttreeConditionOutput: any = {
                  x: currenttreeCondition.left + 2 - containerLeftOffset, // Adjust based on container position
                  y: currenttreeCondition.bottom - containerTopOffset // Adjust based on container position
                };

                // Draw line from current switch case to next processor (bottom to top)
                this.drawLine(currenttreeConditionOutput.x, currenttreeConditionOutput.y, nextProcessorInput.x, nextProcessorInput.y);
              }
            }
          }
        } else {
          const currentProcessorEle: HTMLElement | null = document.getElementById(`output-bottom-${processorNodes[i].id}`);
          if (currentProcessorEle) {
            const currentProcessor: DOMRect = currentProcessorEle.getBoundingClientRect();
            const currentProcessorOutput = {
              x: currentProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
              y: currentProcessor.bottom - containerTopOffset // Adjust based on container position
            };

            // Draw line from current processor to next processor (bottom to top)
            this.drawLine(currentProcessorOutput.x, currentProcessorOutput.y, nextProcessorInput.x, nextProcessorInput.y);
          }
        }
      }
    }


    this.drawLineSubject.next('');
  }

  private connectLastNodesToOutPut(lastProcessorEle: any, containerLeftOffset: number, containerTopOffset: number, outputCenter: any) {
    // Connect last processor node to output node with a dashed curve
    if (lastProcessorEle) {
      const lastProcessor: DOMRect = lastProcessorEle.getBoundingClientRect();;

      const lastProcessorOutput = {
        x: lastProcessor.left + 2 - containerLeftOffset, // Adjust based on container position
        y: lastProcessor.top - containerTopOffset // Adjust based on container position
      };

      // Draw curved dashed line from last processor node to output node
      this.drawCurvedLine(lastProcessorOutput.x, lastProcessorOutput.y, outputCenter.x, outputCenter.y);
    }

  }

  // Function to get the icon based on the label
  getComponentClass(label: string, category: string) {
    const iconMapping: Record<string, any> = {
      aes_encrypt: EncryptProcessorsComponent,
      aes_decrypt: EncryptProcessorsComponent,
      jasypt_encrypt: EncryptProcessorsComponent,
      jasypt_decrypt: EncryptProcessorsComponent,
      json_to_json: JsonProcessorComponent,
      json_to_xml: JsonProcessorComponent,
      fixed_position_parser: JsonProcessorComponent,
      sftp: SftpProcessorComponent,
      sql_insert: SqlProcessorComponent,
      sql_select: SqlProcessorComponent,
      sql_raw: SqlProcessorComponent,
      cassandra: SqlProcessorComponent,
      log: LogProcessorComponent,
      aws_s3: AwsS3ProcessorComponent,
      http_client: HttpClientProcessorComponent,
      http_server: HttpServerprocessorComponent,
      http_controller: HttpControllerProcessorComponent,
      kafka: category === 'Input' ? KafkaInputComponent : KafkaOutputComponent,
      switch: SwitchProcessorComponent,
      set_config: SetConfigProcessorComponent,
      multipart_formdata: MultipartDataformProcessorComponent,
      data_validator: DataValidatorProcessorComponent,
      redis:  category === 'Processor' ? RedisProcessorComponent: null,
    };
    // if(label === componentKeys.sql)
    return iconMapping[label];
  }

  // Function to get the icon based on the label
  getDataMapperIcon(label: string) {
    const iconMapping: Record<string, string> = {
      sftp: 'heroicons_outline:globe-alt',
      sql_insert: 'heroicons_outline:circle-stack',
      update_run_status: 'heroicons_outline:cpu-chip',
      trim: 'heroicons_outline:cpu-chip',
      xml_parser: 'heroicons_outline:cpu-chip',
      json_schema: 'heroicons_outline:cpu-chip',
      bloblang: 'heroicons_outline:cpu-chip',
      splitter: 'heroicons_outline:cpu-chip',
      switch: 'heroicons_outline:cpu-chip',
      fallback: 'heroicons_outline:circle-stack',
      sequential: 'heroicons_outline:circle-stack',
      output: 'heroicons_outline:cpu-chip',
    };
    // if(label === componentKeys.sql)
    return iconMapping[label] ?? 'heroicons_outline:question-mark-circle';
  }

}

