import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PolicyModel } from '../../../core/models/policy.model';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from '../../../core/services/policy.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entity',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [
    DatePipe, // ✅ Added here
  ],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
})
export class EntityComponent {
  policyId: number = 0;
  model!: PolicyModel;

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  private formBuilder = inject(FormBuilder);
  policyForm = this.formBuilder.group({
    id: [0],
    title: [''],
    description: [''],
    policyType: [0],
    companyId: [''],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.policyId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.policyId > 0) {
      this.policyService.getById(this.policyId).subscribe((res) => {
        this.model = res.data as PolicyModel;
        console.log(this.model);

        this.policyForm.controls.id.setValue(this.model.id);
        this.policyForm.controls.id.disable();
        this.policyForm.controls.title.setValue(this.model.title);
        this.policyForm.controls.description.setValue(this.model.description);
        this.policyForm.controls.policyType.setValue(this.model.policyType);
        this.policyForm.controls.companyId.setValue(this.model.companyId);
        this.policyForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.policyForm.controls.createdBy.setValue(this.model.createdBy);
        this.policyForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.policyForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.policyForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.policyForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.policyForm.controls.remark.setValue(this.model.remark);
      });
    }
  }

  submit(): void {
    let createdOn = this.datepipe.transform(
      this.policyForm.controls.createdOn.value,
      'yyyy-MM-dd'
    );

    let updatedOn = this.datepipe.transform(
      this.policyForm.controls.updatedOn.value,
      'yyyy-MM-dd'
    );

    let deletedOn = this.datepipe.transform(
      this.policyForm.controls.deletedOn.value,
      'yyyy-MM-dd'
    );
    var model: PolicyModel = {
      id: this.policyForm.controls.id.value ?? 0,
      title: this.policyForm.controls.title.value ?? '',
      description: this.policyForm.controls.description.value ?? '',
      policyType: this.policyForm.controls.policyType.value ?? 0,
      companyId: this.policyForm.controls.companyId.value ?? '',
      createdOn: createdOn,
      createdBy: this.policyForm.controls.createdBy.value ?? '',
      updatedOn: updatedOn,
      updatedBy: this.policyForm.controls.updatedOn.value ?? '',
      deletedOn: deletedOn,
      deletedBy: this.policyForm.controls.deletedOn.value ?? '',
      remark: this.policyForm.controls.deletedBy.value ?? '',
    };

    if (this.policyId > 0) {
      this.policyService.update(this.policyId, model).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.policyService.create(model).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
