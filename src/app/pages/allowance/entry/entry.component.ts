import { Component, inject, OnInit } from '@angular/core';
import { AllowanceModel } from '../../../core/models/allowance.model';
import { AllowanceService } from '../../../core/services/allowance.service';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageService } from 'primeng/api';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { Editor } from 'primeng/editor';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectModule } from 'primeng/select';
import { ViCompanyModel } from '../../../core/models/company.model';
import { CompanyService } from '../../../core/services/company.service';
import { BranchService } from '../../../core/services/branch.service';
import { ViBranchModel } from '../../../core/models/branch.model';
import { DepartmentService } from '../../../core/services/department.service';
import { ViDepartmentModel } from '../../../core/models/department.model';
import { PositionService } from '../../../core/services/position.service';
import { ViPositionModel } from '../../../core/models/position.model';

@Component({
  selector: 'app-entry',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ToggleSwitchModule,
    ToggleSwitch,
    ProgressSpinnerModule,
    Editor,
    SelectModule,
  ],
  providers: [
    DatePipe,
    MessageService, // ✅ Added here
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  allowanceId: number = 0;
  model!: AllowanceModel;
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
  positions: ViPositionModel[] = [];
  selectedPosition!: ViPositionModel;

  // formGroup: FormGroup | undefined;
  showDialog() {
    this.visible = true;
  }
  constructor(
    private allowanceService: AllowanceService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private companyService: CompanyService,
    private branchService: BranchService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  private formBuilder = inject(FormBuilder);
  allowanceForm = this.formBuilder.group({
    allowanceId: [0, Validators.required],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    positionId: [0, Validators.required],
    allowanceName: [''],
    description: [''],
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

    this.allowanceId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.allowanceId > 0) {
      this.isEdit = true;
      this.loading = true;

      this.allowanceService.getById(this.allowanceId).subscribe((res) => {
        this.model = res.data as AllowanceModel;
        console.log(this.model);

        this.allowanceForm.controls.allowanceId.setValue(
          this.model.allowanceId
        );
        this.allowanceForm.controls.allowanceId.disable();
        this.allowanceForm.controls.branchId.setValue(this.model.branchId);
        this.allowanceForm.controls.deptId.setValue(this.model.deptId);
        this.allowanceForm.controls.positionId.setValue(this.model.positionId);
        this.allowanceForm.controls.allowanceName.setValue(
          this.model.allowanceName
        );
        this.allowanceForm.controls.description.setValue(
          this.model.description
        );

        this.allowanceForm.controls.status.setValue(this.model.status);
        this.allowanceForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.createdBy.setValue(this.model.createdBy);
        this.allowanceForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );

        this.allowanceForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.allowanceForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.allowanceForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.allowanceForm.controls.remark.setValue(this.model.remark);
      });
    } else {
      this.onCompanyChange();
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

  getPositions(
    companyId: string,
    branchId: number,
    departmentId: number
  ): void {
    this.positionService
      .getByCBDid(companyId, branchId, departmentId)
      .subscribe({
        next: (res) => {
          this.positions = res.data;
          if (this.isEdit) {
            this.selectedPosition = this.positions.filter(
              (x) => x.positionId == this.model.positionId
            )[0];

            this.onPositionChange();
          }
        },
      });
  }

  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.allowanceForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranches(this.selectedCompany.companyId);
    }
  }

  onBranchChange(): void {
    if (this.selectedBranch !== undefined && this.selectedBranch !== null) {
      this.allowanceForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );
      this.getDepartment(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId
      );
    }
  }

  onPositionChange(): void {
    if (this.selectedPosition != undefined && this.selectedPosition != null) {
      this.allowanceForm.controls.positionId.setValue(
        this.selectedPosition.positionId
      );
    }
  }

  onDepartmentChange(): void {
    if (
      this.selectedDepartments != undefined &&
      this.selectedDepartments != null
    ) {
      this.allowanceForm.controls.deptId.setValue(
        this.selectedDepartments.deptId
      );

      this.getPositions(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId,
        this.selectedDepartments.deptId
      );
    }
  }

  submit(): void {
    console.log('Form Submitted:', this.allowanceForm.value);
    if (this.allowanceForm.valid) {
      let createdOn = this.datepipe.transform(
        this.allowanceForm.controls.createdOn.value,
        'yyyy-MM-dd'
      );

      let updatedOn = this.datepipe.transform(
        this.allowanceForm.controls.updatedOn.value,
        'yyyy-MM-dd'
      );

      let deletedOn = this.datepipe.transform(
        this.allowanceForm.controls.deletedOn.value,
        'yyyy-MM-dd'
      );

      var model: AllowanceModel = {
        allowanceId: this.allowanceForm.controls.allowanceId.value ?? 0,
        companyId: this.allowanceForm.controls.companyId.value ?? '',
        branchId: this.allowanceForm.controls.branchId.value ?? 0,
        deptId: this.allowanceForm.controls.deptId.value ?? 0,
        positionId: this.allowanceForm.controls.positionId.value ?? 0,
        allowanceName: this.allowanceForm.controls.allowanceName.value ?? '',
        description: this.allowanceForm.controls.description.value ?? '',
        status: this.allowanceForm.controls.status.value ?? true,
        createdOn: createdOn,
        createdBy: this.allowanceForm.controls.createdBy.value ?? '',
        updatedOn: updatedOn,
        updatedBy: this.allowanceForm.controls.updatedBy.value ?? '',
        deletedOn: deletedOn,
        deletedBy: this.allowanceForm.controls.deletedBy.value ?? '',
        remark: this.allowanceForm.controls.remark.value ?? '',
      };
      if (!this.isEdit) {
        model.allowanceId = 0;
        model.createdOn = this.datepipe.transform(
          new Date(),
          'yyyy-MM-ddTHH:mm:ss'
        );
        model.createdBy = 'Admin';

        this.isSubmitting = true;
        this.loading = true;
        this.allowanceService.create(model).subscribe({
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
              setTimeout(() => {
                this.router.navigate(['/allowance']);
              }, 2000);
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
        this.allowanceService.update(this.allowanceId, model).subscribe({
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
              this.router.navigate(['/allowance']);
            }
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error('Error:', err);
          },
        });
      }
    } else {
      Object.keys(this.allowanceForm.controls).forEach((field) => {
        const control = this.allowanceForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
}
