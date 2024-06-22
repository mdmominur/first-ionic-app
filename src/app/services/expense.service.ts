import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private GET_EXPENSE_LIST = `${environment.apiEndPoint}/getFinances`;
  private CREATE_EXPENSE = `${environment.apiEndPoint}/addExpense`;
  private CREATE_EXPENSES = `${environment.apiEndPoint}/addExpenses`;
  private UPDATE_EXPENSE = `${environment.apiEndPoint}/updateExpense`;
  private DELETE_EXPENSE = `${environment.apiEndPoint}/deleteExpense`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Create
  createExpense(expense: any): Observable<any> {
    return this.http.post(this.CREATE_EXPENSE, expense, this.httpOptions);
  }

  createExpenses(expenses: any): Observable<any> {
    return this.http.post(this.CREATE_EXPENSES, expenses, this.httpOptions);
  }

  // Read all
  getExpenses(dateTime:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.GET_EXPENSE_LIST}?year=${dateTime?.year}&month=${dateTime?.month}`);
  }

  // Update
  updateExpense(expense: any, id: number|null): Observable<any> {
    return this.http.post(`${this.UPDATE_EXPENSE}/${id}`, expense, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateExpense'))
      );
  }

  // Delete
  deleteExpense(id: number): Observable<any> {
    const url = `${this.DELETE_EXPENSE}/${id}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteExpense'))
      );
  }

  // Error Handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
