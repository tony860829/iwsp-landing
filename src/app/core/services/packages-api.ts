import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPackage } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class PackagesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}Packages`;

  getPackages(): Observable<IPackage[]> {
    return this.http.get<IPackage[]>(this.url);
  }
}
