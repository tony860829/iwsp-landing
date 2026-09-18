import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IService } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ServicesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}Services`;

  getServices(): Observable<IService[]> {
    return this.http.get<IService[]>(this.url);
  }
}
