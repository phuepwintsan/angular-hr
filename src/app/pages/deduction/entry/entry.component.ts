import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {
  DeductionModel,
  ViDeductionModel,
} from '../../../core/models/deduction.model';
import { ViCompanyModel } from '../../../core/models/company.model';
import { ViBranchModel } from '../../../core/models/branch.model';
import { ViDepartmentModel } from '../../../core/models/department.model';
import { ViPositionModel } from '../../../core/models/position.model';
import { RootModel } from '../../../core/models/root.model';
import { DeductionService } from '../../../core/services/deduction.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../../core/services/company.service';
import { BranchService } from '../../../core/services/branch.service';
import { DepartmentService } from '../../../core/services/department.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-entry',
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
  ],
  providers: [DatePipe, MessageService],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  deductionId: number = 0;
  model!: DeductionModel;
  isEdit: boolean = false;
  isSubmitting: boolean = false;
  modalVisible: boolean = false;
  checked: boolean = false;
  loading: boolean = false;
  visible: boolean = false;
  companies: ViCompanyModel[] = [];
  selectedCompany!: ViCompanyModel;
  branches: ViBranchModel[] = [];
  selectedBranch!: ViBranchModel;
  departments: ViDepartmentModel[] = [];
  selectedDepartments!: ViDepartmentModel;

  constructor(
    private deductionService: DeductionService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private companyService: CompanyService,
    private branchService: BranchService,
    private departmentService: DepartmentService
  ) {}

  private formBuilder = inject(FormBuilder);
  deductionForm = this.formBuilder.group({
    deductionId: [0],
    companyId: [''],
    branchId: [0],
    deptId: [0],
    deductionName: [''],
    description: [''],
    isDefault: [true],
    status: [true],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });

  ngOnInit(): void {
    this.getCompanies();
    console.log('companies' + this.companies);

    this.deductionId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.deductionId > 0) {
      this.isEdit = true;
      this.loading = true;

      this.deductionService.getById(this.deductionId).subscribe((res) => {
        this.model = res.data as DeductionModel;
        console.log(this.model);

        this.deductionForm.controls.deductionId.setValue(
          this.model.deductionId
        );
        this.deductionForm.controls.deductionId.disable();
        this.deductionForm.controls.companyId.setValue(this.model.companyId);
        this.deductionForm.controls.branchId.setValue(this.model.branchId);
        this.deductionForm.controls.deptId.setValue(this.model.deptId);
        this.deductionForm.controls.deductionName.setValue(
          this.model.deductionName
        );
        this.deductionForm.controls.description.setValue(
          this.model.description
        );
        this.deductionForm.controls.isDefault.setValue(this.model.isDefault);
        this.deductionForm.controls.description.setValue(
          this.model.description
        );

        this.deductionForm.controls.status.setValue(this.model.status);
        this.deductionForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.createdBy.setValue(this.model.createdBy);
        this.deductionForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.deductionForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.deductionForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.deductionForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.deductionForm.controls.remark.setValue(this.model.remark);
      });
    } else {
      this.onCompanyChange();
    }

    if (!this.isEdit) {
      this.deductionForm.reset();
      this.deductionForm.controls.deductionId.setValue(0);
    }
  }

  getCompanies(): void {
    this.companyService.get().subscribe({
      next: (res) => {
        this.companies = res.data;
        if (this.isEdit) {
          this.selectedCompany = this.companies.filter(
            (x) => x.companyId == this.model.companyId
          )[0];
          this.onCompanyChange();
        }
      },
      error: () => {},
    });
  }

  getBranches(companyid: string): void {
    this.branchService.getByCid(companyid).subscribe({
      next: (res) => {
        this.branches = res.data;
        if (this.isEdit) {
          this.selectedBranch = this.branches.filter(
            (x) => x.branchId == this.model.branchId
          )[0];
          this.onBranchChange();
        }
      },
      error: () => {},
    });
  }

  getDepartment(companyId: string, branchId: number): void {
    this.departmentService.getByCBid(companyId, branchId).subscribe({
      next: (res) => {
        this.departments = res.data;
        if (this.isEdit) {
          this.selectedDepartments = this.departments.filter(
            (x) => x.deptId == this.model.deptId
          )[0];
          this.onDepartmentChange();
        }
      },
      error: () => {},
    });
  }

  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.deductionForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranches(this.selectedCompany.companyId);
    }
  }

  onBranchChange(): void {
    if (this.selectedBranch !== undefined && this.selectedBranch !== null) {
      this.deductionForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );
      this.getDepartment(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId
      );
    }
  }

  onDepartmentChange(): void {
    if (
      this.selectedDepartments != undefined &&
      this.selectedDepartments != null
    ) {
      this.deductionForm.controls.deptId.setValue(
        this.selectedDepartments.deptId
      );
    }
  }

  submit(): void {
    console.log('Form Submitted:', this.deductionForm.value);
    if (this.deductionForm.valid) {
      let createdOn = this.datepipe.transform(
        this.deductionForm.controls.createdOn.value,
        'yyyy-MM-dd'
      );

      let updatedOn = this.datepipe.transform(
        this.deductionForm.controls.updatedOn.value,
        'yyyy-MM-dd'
      );

      let deletedOn = this.datepipe.transform(
        this.deductionForm.controls.deletedOn.value,
        'yyyy-MM-dd'
      );

      var model: DeductionModel = {
        deductionId: this.deductionForm.controls.deductionId.value ?? 0,
        companyId: this.deductionForm.controls.companyId.value ?? '',
        branchId: this.deductionForm.controls.branchId.value ?? 0,
        deptId: this.deductionForm.controls.deptId.value ?? 0,
        deductionName: this.deductionForm.controls.deductionName.value ?? '',
        description: this.deductionForm.controls.description.value ?? '',
        isDefault: this.deductionForm.controls.isDefault.value ?? true,
        status: this.deductionForm.controls.status.value ?? true,
        createdOn: createdOn,
        createdBy: this.deductionForm.controls.createdBy.value ?? '',
        updatedOn: updatedOn,
        updatedBy: this.deductionForm.controls.updatedBy.value ?? '',
        deletedOn: deletedOn,
        deletedBy: this.deductionForm.controls.deletedBy.value ?? '',
        remark: this.deductionForm.controls.remark.value ?? '',
      };
      if (!this.isEdit) {
        model.deductionId = 0;
        model.createdOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );
        model.createdBy = 'Admin';

        this.isSubmitting = true;
        this.loading = true;
        this.deductionService.create(model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                key: 'globalMessage',
                severity: 'info',
                summary: 'Success',
                detail: res.message.toString(),
              });
              this.loading = false;
              this.router.navigate(['/deduction']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
      } else {
        this.deductionService.updateById(this.deductionId, model).subscribe({
          next: (res) => {
            console.log('API Response:', res);
            if (res.success) {
              this.modalVisible = false;

              this.messageService.add({
                key: 'globalMessage',
                severity: 'info',
                summary: 'Success',
                detail: res.message.toString(),
              });
              this.loading = false;
              this.router.navigate(['/deduction']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      }
    } else {
      Object.keys(this.deductionForm.controls).forEach((field) => {
        const control = this.deductionForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
}
