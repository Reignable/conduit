import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { RegisterRequest, UserResponse } from '@model'
import { httpRequestStates } from 'ngx-http-request-state'

@Injectable({
  providedIn: 'root',
})
export class UserAndAuthenticationService {
  private httpClient = inject(HttpClient)

  register = (requestBody: RegisterRequest) =>
    this.httpClient.post<UserResponse>('/users', requestBody).pipe(httpRequestStates())
}
