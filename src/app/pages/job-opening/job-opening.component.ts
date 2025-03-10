import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {
  JobOpeningModel,
  ViJobOpeningModel,
} from '../../core/models/job-opening.model';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { JobOpeningService } from '../../core/services/job-opening.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  ],
  templateUrl: './job-opening.component.html',
  styleUrl: './job-opening.component.scss',
})
export class JobOpeningComponent implements OnInit {
  jobopens: ViJobOpeningModel[] = [];
  selectedJobOpens!: JobOpeningModel;

  constructor(
    private jobOpenService: JobOpeningService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.jobOpenService.get().subscribe((res) => {
      this.jobopens = res.data as ViJobOpeningModel[];
    });
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
    }
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
