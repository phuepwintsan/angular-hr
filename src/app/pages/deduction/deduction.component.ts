import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { DeductionService } from '../../core/services/deduction.service';
import {
  DeductionModel,
  ViDeductionModel,
} from '../../core/models/deduction.model';
import { TagModule } from 'primeng/tag';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-deduction',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    CommonModule,
    InputIconModule,
    IconFieldModule,
    CardModule,
    TagModule,
  ],

  templateUrl: './deduction.component.html',
  styleUrl: './deduction.component.scss',
})
export class DeductionComponent implements OnInit {
  deductions: ViDeductionModel[] = [];
  selectedDeduction!: ViDeductionModel;
  loading: boolean = true;

  constructor(
    private deductionService: DeductionService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.deductionService.get().subscribe({
      next: (res) => {
        this.deductions = res.data as ViDeductionModel[];
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
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

  update(deduction: DeductionModel): void {
    this.route.navigate(['/deduction/entry', deduction.deductionId]);
  }

  delete(deduction: ViDeductionModel): void {
    this.selectedDeduction = deduction;
    if (this.selectedDeduction != null) {
      this.deductionService
        .deleteById(this.selectedDeduction.deductionId)
        .subscribe((res) => {
          this.loadData();
        });
    }
  }
}
