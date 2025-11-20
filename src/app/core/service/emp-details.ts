import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpDetails {
  private apiUrl = 'https://demo.inngenius.com/webapi/Api/Global/GetUserProperty';

  constructor(private http: HttpClient) {}

  getUserProperty(): Observable<any> {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJbm5HZW5uaXVzIiwiYXVkIjpudWxsLCJpYXQiOjYzODk4NjI1NzM3NTA3NjQ3NywiZXhwIjo2Mzg5ODcxMjEzNzUwNzY0NzcsIlVzZXJJZCI6Nzg0LCJMb2dpbkdyb3VwIjoiZGVtbyJ9.ymSoq_81Zwp7lqe5x1XY4FcFEfRAth1C9s4i8ys8tTI'; // <-- yaha apna token daalein

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // Agar koi custom header bhi chahiye ho to yaha add karein
      // 'Client-Key': '12345'
    });

    return this.http.get(this.apiUrl, {
      headers: headers,
      params: {
        userName: 'AdminInngenius',
        selectedPropertyGroup: 'demo',
      },
    });
  }
}
