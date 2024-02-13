import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  // Get all items
  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  // Get a single item by id
  getItemById(id: number | string | null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${id}`);
  }

  // Create a new item
  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts`, item);
  }

  // Update an existing item
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/posts/${id}`, item);
  }

  // Delete an item
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`);
  }
}
