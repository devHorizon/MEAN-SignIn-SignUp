import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  errMess:any;
  private userUrl = 'http://localhost:8080/api/users';

  constructor (private http: HttpClient) {}

  getUsers(email:String): Promise<void | User> {
    return this.http.get(this.userUrl + '/' + email)
               .toPromise()
              .then(response => response as User)
               .catch(this.handleError);
  }

  getUsersByPass(email:string,pass:string): Promise<void | User> {
    const params = new HttpParams().set('id', email).set('pass', pass);  
    return this.http.get(this.userUrl,{params})
               .toPromise()
              .then(response => response as User)
               .catch(this.handleError);
  }

  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.userUrl, newUser)
               .toPromise()
               .then(response => response as User, err=> this.errMess=err)
               .catch(this.handleError);
  }



  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
