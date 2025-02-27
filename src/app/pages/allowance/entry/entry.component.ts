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
import { Dialog } from 'primeng/dialog';
import { DomSanitizer } from '@angular/platform-browser';

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
    Dialog,
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
    private sanitizer: DomSanitizer
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
    this.allowanceId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.allowanceId > 0) {
      this.isEdit = true;
      this.loading = true;
      // this.formGroup = new FormGroup({
      //   text: new FormControl(),
      // });
      this.allowanceService.getById(this.allowanceId).subscribe((res) => {
        this.model = res.data as AllowanceModel;
        console.log(this.model);

        this.allowanceForm.controls.allowanceId.setValue(
          this.model.allowanceId
        );
        this.allowanceForm.controls.allowanceId.disable();
        this.allowanceForm.controls.companyId.setValue(this.model.companyId);
        this.allowanceForm.controls.branchId.setValue(this.model.branchId);
        this.allowanceForm.controls.companyId.setValue(this.model.companyId);
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
        // model.updatedOn = this.datepipe.transform(
        //   new Date(),
        //   'yyyy-MM-ddTHH:mm:ss'
        // );
        // model.updatedBy = 'Admin'; if you want to assign in vs code

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
              setTimeout(() => {
                this.router.navigate(['/allowance']);
              }, 2000);
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
