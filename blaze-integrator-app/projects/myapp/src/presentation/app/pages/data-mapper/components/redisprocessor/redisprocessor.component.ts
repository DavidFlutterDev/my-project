import { inject, Component, signal, WritableSignal, computed, OnInit, Input, Output, EventEmitter, DoCheck, ViewChild, AfterViewInit } from "@angular/core";
import { RedisProcessorService } from "./redisprocessor.service";
import { FormsModule, NgForm } from "@angular/forms";
import { vestForms, validateShape, FormDirective } from "@clay/ui-components/form-validations";
import { createform_0ValidationSuite } from "./redisprocessor.validations";
import { ClButtonComponent, ClInputComponent, ClSelectComponent } from "@clay/ui-components/basic";

@Component({
  standalone: true,
  selector: 'app-redisprocessor',
  styleUrl: './redisprocessor.component.scss',
  templateUrl: './redisprocessor.component.html',
  imports: [vestForms, FormsModule, FormDirective, ClInputComponent, ClButtonComponent, ClSelectComponent,],
  providers: [RedisProcessorService],
})
export class RedisProcessorComponent implements OnInit, DoCheck, AfterViewInit {
  @Input({ required: true })
  public node: any;


  constructor() {
  }

  @ViewChild('form0') form0!: NgForm;

  protected redisProcessorService: RedisProcessorService = inject(RedisProcessorService);

  ngOnInit(): void {

    this.form_0FormValue = this.redisProcessorService.form_0FormValue;


    this.redisProcessorService.saveButtonProperties.onSubmit =
      this.emitFormData.bind(this);

    this.redisProcessorService.operationProperties.onValueChange = this.onOperationChange.bind(this);
    if (this.node.data) {
        this.form_0FormValue.set(this.node.data);
    }
  }
  ngAfterViewInit(): void {
    if (this.node.data) {
      setTimeout(() => {
        this.form_0FormValue.set(this.node.data);
      }, 100);
    }

  }
  ngDoCheck() {
    this.redisProcessorService.saveButtonProperties.disabled = !this.form_0FormValid();
  }

  protected form_0FormValue!: WritableSignal<any>;
  protected readonly form_0Suite = createform_0ValidationSuite;
  protected readonly form_0FormValid = signal<boolean>(false);
  protected readonly form_0Errors = signal<Record<string, string>>({});
  private readonly form_0ViewModel = computed(() => {
    return {
      errors: this.form_0Errors(),
      formValid: this.form_0FormValid(),
      formValue: this.form_0FormValue(),
    }
  });

  protected get form_0Vm() {
    return this.form_0ViewModel();
  }

  protected setform_0FormValue(v: any) {
    this.form_0FormValue.set(v);

  }

  onOperationChange(val: any) {
    setTimeout(() => {
      this.form0.controls['value'].updateValueAndValidity();
    }, 100);
  }


  emitFormData() {
    this.node.isDataValid = true;
    this.onSubmitClicked(this.form_0FormValue());
  }

  onSubmitClicked(event: any) { }

}
