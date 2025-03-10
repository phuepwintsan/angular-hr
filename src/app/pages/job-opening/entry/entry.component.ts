import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ViCompanyModel } from '../../../core/models/company.model';
import {
  JobOpeningModel,
  ViJobOpeningModel,
} from '../../../core/models/job-opening.model';
import { ViBranchModel } from '../../../core/models/branch.model';
import { ViDepartmentModel } from '../../../core/models/department.model';
import { ViPositionModel } from '../../../core/models/position.model';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../../core/services/company.service';
import { BranchService } from '../../../core/services/branch.service';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionService } from '../../../core/services/position.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Editor } from 'primeng/editor';
import { SelectModule } from 'primeng/select';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { JobOpeningService } from '../../../core/services/job-opening.service';
import { RootModel } from '../../../core/models/root.model';

//#region component
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
    SelectModule,
    DatePickerModule,
  ],
  providers: [
    DatePipe,
    MessageService,
    DatePicker, // ✅ Added here
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
//#endregion

//#region Declaration
export class EntryComponent {
  id: number = 0;
  model!: ViJobOpeningModel;
  today: Date = new Date();

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

  errormessage!: RootModel[];
  //#endregion

  //#region jobOpensForm
  private formBuilder = inject(FormBuilder);
  jobOpensForm = this.formBuilder.group({
    id: [0],
    title: ['', Validators.required],
    description: ['', Validators.required],
    noOfApplicants: [0, Validators.required],
    startOn: ['', Validators.required],
    endOn: ['', Validators.required],
    companyId: ['', Validators.required],
    branchId: [0, Validators.required],
    deptId: [0, Validators.required],
    positionId: [0, Validators.required],
    openingStatus: [true],
    createdOn: [''],
    createdBy: [''],
    updatedOn: [''],
    updatedBy: [''],
    deletedOn: [''],
    deletedBy: [''],
    remark: [''],
  });
  //#endregion

  //#region Constructor
  constructor(
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private companyService: CompanyService,
    private branchService: BranchService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private jobOpensService: JobOpeningService
  ) {}
  //#endregion

  //#region ngOnInit
  ngOnInit(): void {
    console.log('companies' + this.companies);
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

    if (this.id > 0) {
      this.isEdit = true;
      this.loading = true;

      this.jobOpensService.getById(this.id).subscribe((res) => {
        this.model = res.data as ViJobOpeningModel;
        console.log(this.model);

        this.jobOpensForm.controls.id.setValue(this.model.id);
        this.jobOpensForm.controls.id.disable;
        this.jobOpensForm.controls.title.setValue(this.model.title);
        this.jobOpensForm.controls.description.setValue(this.model.description);
        this.jobOpensForm.controls.noOfApplicants.setValue(
          this.model.noOfApplicants
        );
        this.jobOpensForm.controls.startOn.setValue(
          this.model.startOn
            ? this.datepipe.transform(this.model.startOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpensForm.controls.endOn.setValue(
          this.model.endOn
            ? this.datepipe.transform(this.model.endOn, 'yyyy-MM-dd')
            : null
        );

        this.jobOpensForm.controls.companyId.setValue(this.model.companyId);
        this.jobOpensForm.controls.branchId.setValue(this.model.branchId);
        this.jobOpensForm.controls.deptId.setValue(this.model.deptId);
        this.jobOpensForm.controls.positionId.setValue(this.model.positionId);
        this.jobOpensForm.controls.openingStatus.setValue(
          this.model.openingStatus
        );
        this.jobOpensForm.controls.createdOn.setValue(
          this.model.createdOn
            ? this.datepipe.transform(this.model.createdOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpensForm.controls.createdBy.setValue(this.model.createdBy);
        this.jobOpensForm.controls.updatedOn.setValue(
          this.model.updatedOn
            ? this.datepipe.transform(this.model.updatedOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpensForm.controls.updatedBy.setValue(this.model.updatedBy);
        this.jobOpensForm.controls.deletedOn.setValue(
          this.model.deletedOn
            ? this.datepipe.transform(this.model.deletedOn, 'yyyy-MM-dd')
            : null
        );
        this.jobOpensForm.controls.deletedBy.setValue(this.model.deletedBy);
        this.jobOpensForm.controls.remark.setValue(this.model.remark);

        this.getCompanies();
      });
    } else {
      this.getCompanies();
    }
    if (!this.isEdit) {
      this.jobOpensForm.reset();
      this.jobOpensForm.controls.id.setValue(0);
    }
  }
  //#endregion

  //#region getCompanies
  getCompanies(): void {
    this.companyService.get().subscribe({
      next: (res) => {
        this.companies = res.data as ViCompanyModel[];
        if (this.isEdit) {
          this.selectedCompany = this.companies.filter(
            (x) => x.companyId == this.model.companyId
          )[0];
          this.onCompanyChange();
          this.onBranchChange();
        }
      },
      error: () => {},
    });
  }
  //#endregion

  //#region getBranches
  getBranches(companyid: string): void {
    this.branchService.getByCid(companyid).subscribe({
      next: (res) => {
        this.branches = res.data;
        if (this.isEdit) {
          this.selectedBranch = this.branches.filter(
            (x) => x.branchId == this.model.branchId
          )[0];
          this.onBranchChange();
          this.onCompanyChange();
        }
      },
      error: () => {},
    });
  }
  //#endregion

  //#region getDepartment
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
  //#endregion

  //#region getPositions
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
  //#endregion

  //#region onCompanyChange
  onCompanyChange(): void {
    if (this.selectedCompany !== undefined && this.selectedCompany !== null) {
      this.jobOpensForm.controls.companyId.setValue(
        this.selectedCompany.companyId
      );
      this.getBranches(this.selectedCompany.companyId);
    }
  }
  //#endregion

  //#region onBranchChange
  onBranchChange(): void {
    if (this.selectedBranch !== undefined && this.selectedBranch !== null) {
      this.jobOpensForm.controls.branchId.setValue(
        this.selectedBranch.branchId
      );
      this.getDepartment(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId
      );
    }
  }
  //#endregion

  //#region onPositionChange
  onPositionChange(): void {
    if (this.selectedPosition != undefined && this.selectedPosition != null) {
      this.jobOpensForm.controls.positionId.setValue(
        this.selectedPosition.positionId
      );
    }
  }
  //#endregion

  //#region onDepartmentChange
  onDepartmentChange(): void {
    if (
      this.selectedDepartments != undefined &&
      this.selectedDepartments != null
    ) {
      this.jobOpensForm.controls.deptId.setValue(
        this.selectedDepartments.deptId
      );

      this.getPositions(
        this.selectedCompany.companyId,
        this.selectedBranch.branchId,
        this.selectedDepartments.deptId
      );
    }
  }
  //#endregion

  //#region submit
  submit(): void {
    if (this.jobOpensForm.valid) {
      const start = new Date(this.jobOpensForm.controls.startOn.value ?? '');
      const end = new Date(this.jobOpensForm.controls.endOn.value ?? '');

      if (start < end) {
        var model: JobOpeningModel = {
          id: this.jobOpensForm.controls.id.value ?? 0,
          title: this.jobOpensForm.controls.title.value ?? '',
          description: this.jobOpensForm.controls.description.value ?? '',
          noOfApplicants: this.jobOpensForm.controls.noOfApplicants.value ?? 0,
          startOn: this.jobOpensForm.controls.startOn.value
            ? this.datepipe.transform(
                this.jobOpensForm.controls.startOn.value,
                'yyyy-MM-dd'
              )
            : '',
          endOn: this.jobOpensForm.controls.endOn.value
            ? this.datepipe.transform(
                this.jobOpensForm.controls.endOn.value,
                'yyyy-MM-dd'
              )
            : '',
          companyId: this.jobOpensForm.controls.companyId.value ?? '',
          branchId: this.jobOpensForm.controls.branchId.value ?? 0,
          deptId: this.jobOpensForm.controls.deptId.value ?? 0,
          positionId: this.jobOpensForm.controls.positionId.value ?? 0,
          openingStatus: this.jobOpensForm.controls.openingStatus.value ?? true,
          createdOn: this.datepipe.transform(
            this.jobOpensForm.controls.createdOn.value,
            'yyyy-MM-dd'
          ),
          createdBy: this.jobOpensForm.controls.createdBy.value,
          updatedOn: this.datepipe.transform(
            this.jobOpensForm.controls.updatedOn.value,
            'yyyy-MM-dd'
          ),
          updatedBy: this.jobOpensForm.controls.updatedBy.value,
          deletedOn: this.datepipe.transform(
            this.jobOpensForm.controls.deletedOn.value,
            'yyyy-MM-dd'
          ),
          deletedBy: this.jobOpensForm.controls.deletedBy.value,
          remark: this.jobOpensForm.controls.remark.value,
        };

        //#region Create
        if (!this.isEdit) {
          model.id = 0;
          model.createdOn = this.datepipe.transform(
            new Date(),
            'yyyy-MM-ddTHH:mm:ss'
          );
          model.createdBy = 'Ari';
          this.isSubmitting = true;
          this.loading = true;
          this.jobOpensService.create(model).subscribe({
            next: (res) => {
              if (res.success) {
                this.modalVisible = false;
                this.messageService.add({
                  key: 'globalMessage',
                  severity: 'info',
                  summary: 'Success',
                  detail: res.message.toString(),
                });
                this.loading = false;
                this.router.navigate(['/job-opening']);
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
        }
        //#endregion

        //#region Update
        else {
          console.log(this.model);
          this.jobOpensService.updateById(this.id, model).subscribe({
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
                this.router.navigate(['/job-opening']);
              }
            },
            error: (err) => {
              this.isSubmitting = false;
              console.error('Error:', err);
            },
          });
        }
        //#endregion
      } else {
        console.log('End date is greather than Start Date');
        this.messageService.add({
          key: 'globalMessage',
          severity: 'error',
          summary: 'End Date is greather than Start Date',
        });
      }
    } else {
      Object.keys(this.jobOpensForm.controls).forEach((field) => {
        const control = this.jobOpensForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
    }
  }
  //#endregion
}
