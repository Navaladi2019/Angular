import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { 


  }

  public login(obj:any) {
    return this.http.get("").pipe(
      map(this.SuccessHandler), catchError(this.ErrorHandler)
    );
  }


  private SuccessHandler(response: Response) {
    let data = response;
    return data || {};
  }

  private ErrorHandler(error: Response | any) {
    let errMsg: string;
    
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }
}
