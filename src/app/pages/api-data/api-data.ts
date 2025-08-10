import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { ApiService, Holiday } from '../../services/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe],
  templateUrl: './api-data.html',
  styleUrl: './api-data.scss'
})
export class ApiData {
  private api = inject(ApiService);
  currentYear = new Date().getFullYear();
  holidays$!: Observable<Holiday[]>;

  ngOnInit() {
    this.holidays$ = this.api.getCanadianHolidays(this.currentYear);
  }
}
