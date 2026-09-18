import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactPayload, ContactResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ContactApi {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<ContactResponse> {
    const url = `${environment.apiUrl}Check?token=${environment.apiKey}`;
    return this.http.post<ContactResponse>(url, payload);
  }
}
