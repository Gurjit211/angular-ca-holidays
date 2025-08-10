import { Component, inject } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, Holiday } from '../../services/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private api = inject(ApiService);
  currentYear = new Date().getFullYear();

  // next 5 upcoming holidays
  upcoming$!: Observable<Holiday[]>;

  ngOnInit() {
    const today = new Date();
    this.upcoming$ = this.api.getCanadianHolidays(this.currentYear).pipe(
      map(list =>
        list
          .filter(h => new Date(h.date) >= today)
          .slice(0, 5)
      )
    );
  }
}
