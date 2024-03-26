import { AsyncPipe, JsonPipe } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import {
  ChangeDetectionStrategy, Component, inject,
} from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import {
  FormsModule,
} from '@angular/forms'
import { UserStore } from '@state'
import {
  SignalInputDirective,
  ValidatorFn,
  Validators,
  createFormField,
  createFormGroup,
} from 'ng-signal-forms'
import { httpRequestStates, isLoadedState } from 'ngx-http-request-state'
import {
  Subject, switchMap, tap,
} from 'rxjs'
import { UserResponse } from '../../model/auth'

const emailValidator = (): ValidatorFn => (value, setState) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
  if (valid) setState('VALID')
  else setState('INVALID', {
    email: { details: {} },
  })
}

@Component({
  selector: 'conduit-register',
  standalone: true,
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SignalInputDirective, AsyncPipe, HttpClientModule, JsonPipe],
})
export class RegisterComponent {
  private http = inject(HttpClient)
  private userStore = inject(UserStore)

  registerForm = createFormGroup({
    username: createFormField('', { validators: [Validators.required()] }),
    email: createFormField('', { validators: [Validators.required(), emailValidator()] }),
    password: createFormField('', { validators: [Validators.required()] }),
  })

  private submitted = new Subject()
  private registerFormValue$ = toObservable(this.registerForm.value)

  registerRequest$ = this.submitted.pipe(
    switchMap(() => this.registerFormValue$),
    switchMap(formValue =>
      this.http.post<UserResponse>('/users', { user: formValue }).pipe(httpRequestStates()),
    ),
    tap((response) => {
      if (isLoadedState(response)) this.userStore.logIn(response.value.user)
    }),
  )

  get username() {
    return this.registerForm.controls.username
  }

  get email() {
    return this.registerForm.controls.email
  }

  get password() {
    return this.registerForm.controls.password
  }

  handleSubmit() {
    this.registerForm.markAllAsTouched()
    if (!this.registerForm.valid()) return
    this.submitted.next(null)
  }
}
