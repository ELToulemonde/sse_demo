import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

const BASE_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public getData(): Observable<any> {
    const route = `${BASE_URL}/data`;
    return this.http.get(route);
  }
}
