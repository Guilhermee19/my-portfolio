import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BodyJson } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);


  submitForm(formData: BodyJson): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams(formData as any).toString();

    return this.http.post('/', body, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error(error.message || 'Unknown error occurred'));
      })
    );
  }
}
