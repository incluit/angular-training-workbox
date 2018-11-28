import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  private API_BASE_URL = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }


  getJokes(): Observable<any[]> {
    return this.http
      .get<any>(
      `${this.API_BASE_URL}/jokes/random/5`
      )
      .pipe(map(result => result['value']));
  }

  fetchOne(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/jokes/random/3`).pipe(map(result => result['value']));
  }

  postPagos(): Observable<any> {
    return this.http.post(`https://reqres.in/api/users`, {
      'name': 'morpheus',
      'job': 'leader'
    });
  }
}
