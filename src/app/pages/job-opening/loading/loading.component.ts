import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-loading',
  imports: [Skeleton],
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  isEdit: boolean = false;
  constructor(private route: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.route.navigate(['job-opening/entry']);
    }, 2000);
  }
}
