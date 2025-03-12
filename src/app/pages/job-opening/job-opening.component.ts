import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import {
  JobOpeningModel,
  ViJobOpeningModel,
} from '../../core/models/job-opening.model';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExcelService } from '../../core/services/excel.service';

@Component({
  selector: 'app-job-opening',
  imports: [
    RouterModule,
    TableModule,
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    ButtonModule,
    TagModule,
    SplitButton,
    ToastModule,
    InputIconModule,
    SplitButtonModule,
    ConfirmDialogModule,
    ConfirmDialog,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
})
export class JobOpeningComponent implements OnInit {
  @ViewChild(Table) tblJobOpening!: Table;
  jobopens: ViJobOpeningModel[] = [];
  selectedJobOpens!: JobOpeningModel;
  items!: MenuItem[];

  constructor(
    private jobOpenService: JobOpeningService,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private excelService: ExcelService
  ) {
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.update(this.selectedJobOpens),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(this.selectedJobOpens),
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: () => this.excel(),
      },
    ];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.jobOpenService.get().subscribe((res) => {
      this.jobopens = res.data as ViJobOpeningModel[];
    });
  }

  create(): void {
    this.route.navigate(['job-opening/entry']);
  }

  update(jobOpen: JobOpeningModel): void {
    this.selectedJobOpens = jobOpen;
    this.route.navigate(['job-opening/entry', this.selectedJobOpens.id]);
  }

  delete(jobOpen: JobOpeningModel): void {
    this.selectedJobOpens = jobOpen;
    if (this.selectedJobOpens != null) {
      this.jobOpenService.delete(this.selectedJobOpens.id).subscribe((res) => {
        this.loadData();
      });
      this.confirm2();
    }
  }

  confirm2(event?: Event) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Confirm Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.delete(this.selectedJobOpens);

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  excel(): void {
    this.excelService.excel('job-opening ', this.tblJobOpening.tableViewChild);
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
}
