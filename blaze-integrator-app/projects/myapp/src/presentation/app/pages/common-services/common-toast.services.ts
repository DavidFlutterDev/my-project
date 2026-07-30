import { Injectable } from "@angular/core";
import { ClToastService } from "@clay/ui-components/basic";
import { ClComponentTypes } from "@clay/ui-components/shared";

@Injectable({
  providedIn: 'root',
})
export class CommonToastService {
  constructor(
    private toastService: ClToastService,

  ) {}


  showErrorToast(err: string) {
    this.toastService.error({
      id: '',
      type: ClComponentTypes.default,
      message: err,
    });
  }
  showSuccessToast(err: string) {
    this.toastService.success({
      id: '',
      type: ClComponentTypes.default,
      message: err,
    });
  }
  showInfoToast(err: string) {
    this.toastService.info({
      id: '',
      type: ClComponentTypes.default,
      message: err,
    });
  }
}
