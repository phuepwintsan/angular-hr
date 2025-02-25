import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { PolicyModel } from '../../core/models/policy.model';
import { PolicyService } from '../../core/services/policy.service';

@Component({
  selector: 'app-policy',
  imports: [
    RouterModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent implements OnInit {
  selectedPolicy!: PolicyModel;
  policies: PolicyModel[] = [];

  constructor(private policyservice: PolicyService, private route: Router) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.policyservice.get().subscribe((res) => {
      this.policies = res.data as PolicyModel[];
    });
  }

  update(policy: PolicyModel): void {
    this.selectedPolicy = policy;
    this.route.navigate(['policy/entity', this.selectedPolicy.id]);
  }

  delete(policy: PolicyModel): void {
    this.selectedPolicy = policy;
    if (this.selectedPolicy != null) {
      this.policyservice.delete(this.selectedPolicy.id).subscribe((res) => {
        this.loadData();
      });
    }
  }
}
