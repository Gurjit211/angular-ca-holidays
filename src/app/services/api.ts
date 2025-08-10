import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Holiday {
  date: string;           // ISO date
  localName: string;
  name: string;           // English name
  countryCode: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getCanadianHolidays(year = new Date().getFullYear()): Observable<Holiday[]> {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/CA`;
    return this.http.get<Holiday[]>(url);
  }
}
