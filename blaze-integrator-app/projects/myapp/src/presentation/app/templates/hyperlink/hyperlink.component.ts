import { inject, Component, Input, OnInit } from "@angular/core";
import { ClLabelComponent, ClLabelProperties } from "@clay/ui-components/basic";
import { RoutingVariables } from "../../utils/routing.variables";
import { ClComponentTypes } from "@clay/ui-components/shared";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-hyperlink',
  styleUrl: './hyperlink.component.scss',
  templateUrl: './hyperlink.component.html',
  imports: [ClLabelComponent,]
})
export class HyperlinkComponent implements OnInit {
  constructor(private router: Router) {}
  @Input()
  public _value: any;
  @Input()
  public _rowValue: any;
  @Input()
  public properties: any;

  public label15Properties: ClLabelProperties = {
    "id": `label15`, "label": '', "showTooltip": true, "type": ClComponentTypes.label, "style": {
      "contentWidth": `w-full`, "cssClasses": `font-bold text-primary-400 cursor-pointer`,
    }, "onClick": this.onClickLabel.bind(this),
  };

  ngOnInit(): void {
    this.label15Properties.label = this._value;
  }


  public onClickLabel() {
    console.log('row: ', this._rowValue);
    this.router.navigate([RoutingVariables.orchestrationHistoryRoute], {
      state: this._rowValue,
    });
  }
}
