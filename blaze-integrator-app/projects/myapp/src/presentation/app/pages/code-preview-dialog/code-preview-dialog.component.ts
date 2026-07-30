import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ClLabelProperties,
  ClIconProperties,
  ClButtonComponent,
  ClCodeViewComponent,
  ClCodeViewProperties,
  ClLabelComponent,
  ClIconComponent,
} from '@clay/ui-components/basic';
import {
  ClCardComponent,
  ClCardProperties,
} from '@clay/ui-components/containers';
import { ClComponentTypes } from '@clay/ui-components/shared';
import { GlobalVariables } from '../../utils/global.variables';

@Component({
  selector: 'app-code-preview-dialog',
  standalone: true,
  imports: [
    ClCodeViewComponent,
    ClCardComponent,
    ClLabelComponent,
    ClIconComponent,
  ],
  templateUrl: './code-preview-dialog.component.html',
  styleUrl: './code-preview-dialog.component.scss',
})
export class CodePreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CodePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  public previewCardProperties: ClCardProperties = {
    id: `previewCard`,
    type: ClComponentTypes.card,
    style: {
      cssClasses: `h-full`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
      labelCssClasses: `text-2xl md:text-3xFl font-medium `,
    },
  };
  public previewProperties: ClLabelProperties = {
    id: `preview`,
    label: `Preview`,
    type: ClComponentTypes.label,
    style: {
      cssClasses: `text-base text-blue-900 font-bold`,
      contentWidth: `w-full`,
      justifyContent: ``,
      alignContent: ``,
    },
    showTooltip: false,
  };

  public zoomInProperties: ClIconProperties = {
    id: `zoomIn`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `feather:zoom-in`,
    onIconClicked: this.zoomIn.bind(this),
  };

  public eyeIconProperties: ClIconProperties = {
    id: `EyeIcon`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-6 stroke-cyan-900`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `heroicons_outline:eye`,
  };
  public zoomOutProperties: ClIconProperties = {
    id: `zoomOut`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: `icon-size-4`,
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `feather:zoom-out`,
    onIconClicked: this.zoomOut.bind(this),
  };
  public closeProperties: ClIconProperties = {
    id: `close`,
    type: ClComponentTypes.icon,
    style: {
      cssClasses: 'icon-size-5 p-0.5 ml-2',
      contentWidth: ``,
      alignContent: ``,
      justifyContent: ``,
    },
    iconName: `fss_icons:close-icon`,
    onIconClicked: this.closeDialog.bind(this),

  };

  public codeViewProperties: ClCodeViewProperties = {
    id: 'codeView0',
    type: ClComponentTypes.codeView,
    label: '',
    style: {
      cssClasses: 'flex-auto w-full h-full',
    },
    lang: 'json',
    code: this.data.code,
  };

  previewFontSizeIndex: number = 1;

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

  public closeDialog() {
    this.dialogRef.close(''); // Optional data to send on close
  }
}
