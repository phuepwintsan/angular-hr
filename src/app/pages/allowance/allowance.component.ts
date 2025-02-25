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

@Component({
  selector: 'app-allowance',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    ButtonModule,
    CommonModule,
    TagModule,
  ],
  templateUrl: './allowance.component.html',
  styleUrl: './allowance.component.scss',
})
export class AllowanceComponent implements OnInit {
  allowances: AllowanceModel[] = [];
  selectedAllowance!: AllowanceModel;

  constructor(
    private allowanceService: AllowanceService,
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

  delete(policy: AllowanceModel): void {
    this.selectedAllowance = policy;
    if (this.selectedAllowance != null) {
      this.allowanceService
        .delete(this.selectedAllowance.allowanceId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }
}
