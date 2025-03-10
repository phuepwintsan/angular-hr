import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { AllowanceModel } from '../../core/models/allowance.model';
import { AllowanceService } from '../../core/services/allowance.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { CompanyService } from '../../core/services/company.service';
import { SelectModule } from 'primeng/select';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-allowance',
  imports: [
    RouterModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    ButtonModule,
    CommonModule,
    TagModule,
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    RippleModule,
    SelectModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent implements OnInit {
  allowances: AllowanceModel[] = [];
  selectedAllowance!: AllowanceModel;

  allowanceForm: any;

  constructor(
    private allowanceService: AllowanceService,
    private companyService: CompanyService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allowanceService.get().subscribe((res) => {
      this.allowances = res.data as AllowanceModel[];
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }

  update(allowance: AllowanceModel): void {
    this.selectedAllowance = allowance;
    this.route.navigate([
      'allowance/entry',
      this.selectedAllowance.allowanceId,
    ]);
  }

  delete(allowance: AllowanceModel): void {
    this.selectedAllowance = allowance;
    if (this.selectedAllowance != null) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }
}
