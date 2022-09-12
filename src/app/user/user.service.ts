import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  createUser(userData: FormData) {
    return this.http.post(environment.baseUrl + '/user', userData);
  }

  loginUser(userData: {email: string, password: string}) {
    return this.http.put(environment.baseUrl + '/user', userData);
  }
}
