import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ViDepartmentModel } from '../../core/models/department.model';
import { DepartmentService } from '../../core/services/department.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
  ],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  departments: ViDepartmentModel[] = [];
  loading: boolean = true;
  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.departmentService.get().subscribe((res) => {
      this.departments = res.data as ViDepartmentModel[];
      this.loading = false;
    });
  }

  /**
   * Clears all filters from the table.
   * @param table The PrimeNG table instance to clear.
   */
  clear(table: Table) {
    table.clear();
  }
}
