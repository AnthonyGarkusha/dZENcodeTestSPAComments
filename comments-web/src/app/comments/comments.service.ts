import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommentDto {
  id?: number;
  userName: string;
  email: string;
  homepage?: string;
  text: string;
  createdAt?: string;
  parentId?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient) { }

  getComments(): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(this.apiUrl);
  }

  createComment(model: CommentDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(this.apiUrl, model);
  }
}
