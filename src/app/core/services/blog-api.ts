import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ICategory,
  IComment,
  IPost,
  CommentPayload,
  CheckResponse,
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class BlogApi {
  private readonly http = inject(HttpClient);

  // GET y POST de comentarios comparten la misma URL (verbo-distintivo)
  private readonly blogUrl = `${environment.apiUrl}Check/blog?token=${environment.apiKey}`;
  private readonly commentsUrl = `${environment.apiUrl}Check/comments?token=${environment.apiKey}`;
  private readonly categoriesUrl = `${environment.apiUrl}Categories`;

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.blogUrl);
  }

  getPostByTitle(title: string): Observable<IPost> {
    const url = `${environment.apiUrl}Check/blog/${encodeURIComponent(title)}?token=${environment.apiKey}`;
    return this.http.get<IPost>(url);
  }

  getComments(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.commentsUrl}&postId=${postId}`);
  }

  sendComment(payload: CommentPayload): Observable<CheckResponse> {
    return this.http.post<CheckResponse>(this.blogUrl, payload);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl);
  }
}
