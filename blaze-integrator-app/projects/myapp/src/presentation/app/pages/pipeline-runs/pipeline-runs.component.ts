import { inject, Component, OnInit } from "@angular/core";
import { PipelinerunsService } from "./pipeline-runs.service";
import { ClCardComponent, ClCardProperties, ClDataGridComponent, ClTableConfigProperties } from "@clay/ui-components/containers";
import { ClIconComponent, ClIconProperties, ClLabelComponent, ClLabelProperties } from "@clay/ui-components/basic";
import { DatePipe } from "@angular/common";
import { CommonToastService } from "../common-services/common-toast.services";
import { ApiClient } from "projects/myapp/src/api/api.client.services";
import { ApiVariables } from "../../utils/api.variables";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-pipeline-runs',
  styleUrl: './pipeline-runs.component.scss',
  templateUrl: './pipeline-runs.component.html',
  imports: [ClCardComponent, ClIconComponent, ClLabelComponent, ClDataGridComponent,],
  providers: [PipelinerunsService, DatePipe, CommonToastService],
})
export class PipelinerunsComponent implements OnInit {
  constructor(
    private router: Router,
    private apiClient: ApiClient,
    private commonToastService: CommonToastService,
  ) {
    this.checkforPageArguments();
  }

  protected pipelinerunsService: PipelinerunsService = inject(PipelinerunsService);
  protected noDataCardProperties!: ClCardProperties;
  isDataAvailable: boolean = true;
  pipelineId: number = 1;
  pageSize = 5;
  pageNo = 0;


  protected icon0Properties!: ClIconProperties;
  protected label1Properties!: ClLabelProperties;
  protected card1Properties!: ClCardProperties;
  protected datagridProperties!: ClTableConfigProperties;

  ngOnInit(): void {
    this.noDataCardProperties = this.pipelinerunsService.noDataCardProperties;

    this.icon0Properties = this.pipelinerunsService.icon0Properties;

    this.label1Properties = this.pipelinerunsService.label1Properties;

    this.card1Properties = this.pipelinerunsService.card1Properties;

    this.datagridProperties = this.pipelinerunsService.datagridProperties;

    this.isDataAvailable = this.pipelinerunsService.isDataAvailable;

    this.pipelinerunsService.datagridProperties.onPageNoChanged = this.onPageNoChanged.bind(this);

    this.getTemplateList();
  }
  checkforPageArguments(){
    var recievedData = JSON.stringify(
      this.router.getCurrentNavigation()?.extras.state,
    );
    if (recievedData != undefined && recievedData != null) {
      var parsedRecievedData =
        recievedData != null && recievedData != undefined
          ? JSON.parse(recievedData)
          : { data: '' };
      this.pipelineId = parsedRecievedData.id;
      console.log('pipelineId from list screen', this.pipelineId);

    } else {
      console.log('null');
    }
  }
  public getTemplateList() {
    var param = `page=${this.pageNo}&size=${this.pageSize}`;

    this.datagridProperties.showLoading = true;
    this.apiClient.getListapi(ApiVariables.pipeline_runs_url+`/${this.pipelineId}`, param).subscribe({
      next: (data: any) => {
        if (data.status == '0000') {
          this.pipelinerunsService.setTemplateData(data);
          this.isDataAvailable = true;
          this.datagridProperties.showLoading = false;
        } else {
          this.datagridProperties.showLoading = false;
          this.isDataAvailable = false;
          this.commonToastService.showErrorToast('Unable to fetch data');
        }
      },
      error: (err: any) => {
        this.datagridProperties.showLoading = false;
        this.isDataAvailable = false;
        console.log(err);
        this.commonToastService.showErrorToast(err.toString());
      },
    });
  }

  public onPageNoChanged(
    pageNo: any,
    pageSize: any,
    sortColumn: any,
    sortOrder: any,
  ) {
    this.pageNo = pageNo - 1;
    console.log("pagesize", pageSize);
    console.log("datagrid pagesize", this.datagridProperties.pageSize);
    this.pageSize = pageSize;

    this.getTemplateList();
  }


}
