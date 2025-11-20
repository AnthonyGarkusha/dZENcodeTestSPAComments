import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:32775/api/comments'; // заменишь под свой backend

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);

  getComments(page: number = 1, sort: string = 'date_desc'): Observable<any> {
    return this.http.get(API_URL, {
      params: { page, sort }
    });
  }

  createComment(dto: any): Observable < any > {
    return this.http.post(API_URL, dto);
  }
}
