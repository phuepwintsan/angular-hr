import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StateComponent } from './pages/state/state.component';
import { EntryComponent } from './pages/state/entry/entry.component';
import { Component } from '@angular/core';
import { DepartmentComponent } from './pages/department/department.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { EntityComponent } from './pages/policy/entity/entity.component';
import { AllowanceComponent } from './pages/allowance/allowance.component';
import { EntryComponent as AllowanceEntryComponent } from './pages/allowance/entry/entry.component';
import { DeductionComponent } from './pages/deduction/deduction.component';
import { EntryComponent as DeductionEntryComponent } from './pages/deduction/entry/entry.component';
import { JobOpeningComponent } from './pages/job-opening/job-opening.component';
import { EntryComponent as JobOpeningEntryComponent } from './pages/job-opening/entry/entry.component';
import { LoadingComponent } from './pages/job-opening/loading/loading.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'department', component: DepartmentComponent },
  {
    path: 'state',
    children: [
      { path: '', component: StateComponent },
      { path: 'entry/:id', component: EntryComponent },
      { path: 'entry', component: EntryComponent },
    ],
  },
  {
    path: 'policy',
    children: [
      { path: '', component: PolicyComponent },
      { path: 'entity', component: EntityComponent },
      { path: 'entity/:id', component: EntityComponent },
    ],
  },
  {
    path: 'allowance',
    children: [
      { path: '', component: AllowanceComponent },
      { path: 'entry/:id', component: AllowanceEntryComponent },
      { path: 'entry', component: AllowanceEntryComponent },
      { path: 'allowance/entry', component: EntryComponent },
      { path: '', redirectTo: 'allowance', pathMatch: 'full' },
    ],
  },
  {
    path: 'deduction',
    children: [
      { path: '', component: DeductionComponent },
      { path: 'entry/:id', component: DeductionEntryComponent },
      { path: 'entry', component: DeductionEntryComponent },
      // { path: 'deduction/entry', component: DeductionEntryComponent },
      // { path: '', redirectTo: 'deduction', pathMatch: 'full' },
    ],
  },
  {
    path: 'job-opening',
    children: [
      { path: '', component: JobOpeningComponent },
      { path: '', component: LoadingComponent },
      { path: 'loading', component: LoadingComponent },
      { path: 'entry/:id', component: JobOpeningEntryComponent },
      { path: 'entry', component: JobOpeningEntryComponent },
      { path: 'job-opening/entry', component: JobOpeningEntryComponent },
      { path: '', redirectTo: 'job-opening', pathMatch: 'full' },
    ],
  },
];
