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
  
  // Update this line to 2026
  currentYear = 2026;

  upcoming$!: Observable<Holiday[]>;

  ngOnInit() {
    // We set a reference date for Jan 1st, 2026 so the list isn't empty
    const startDate = new Date('2026-01-01'); 
    
    this.upcoming$ = this.api.getCanadianHolidays(this.currentYear).pipe(
      map(list =>
        list
          .filter(h => new Date(h.date) >= startDate)
          .slice(0, 5)
      )
    );
  }
}