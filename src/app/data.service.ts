import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  configUrl = null;
  constructor(private http: HttpClient) { }


  public call (methodNme, param = '' ) {
    const func = this[methodNme];
    if ( !this.configUrl ) {
      const group = this.http.get('https://avetiq-test.firebaseapp.com/group/hasmik_kharatyan');
      const user = this.http.get('https://avetiq-test.firebaseapp.com/user/hasmik_kharatyan');
      return forkJoin([group, user]).pipe(
          mergeMap(res => {
                this.configUrl = `https://avetiq-test.firebaseapp.com/proscons/group/${res[0]['groupId']}/user/${res[1]['userId']}`;
                return func.call(this, param);
              }
          )
      );
    } else {
      return func.call(this, param);
    }
  }

  public getAllData(): Observable<Object> {
    return this.http
        .get<Object>(this.configUrl);
}
  public addTodo(todo: Object): Observable<Object> {
    // const headers = new HttpHeaders({'Content-Type':  'application/json'});
    return this.http
      .put<Object>(this.configUrl, todo, {headers: {'Content-Type':  'application/json'}});
  }

}
