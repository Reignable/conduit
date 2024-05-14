import { AsyncPipe, JsonPipe } from '@angular/common'
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import {
  ChangeDetectionStrategy, Component, inject,
} from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import {
  FormsModule,
} from '@angular/forms'
import { ConduitErrorResponse } from '@model'
import { UserAndAuthenticationService } from '@services'
import { UserStore } from '@state'
import {
  SignalInputDirective,
  ValidatorFn,
  Validators,
  createFormField,
  createFormGroup,
} from 'ng-signal-forms'
import {
  HttpRequestState,
  isLoadedState,
} from 'ngx-http-request-state'
import {
  Observable,
  Subject,
  map, shareReplay, switchMap, tap,
  withLatestFrom,
} from 'rxjs'

const emailValidator = (): ValidatorFn => (value, setState) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
  if (valid) setState('VALID')
  else setState('INVALID', {
    email: { details: {} },
  })
}

const mapResponseErrors = <T>(key: string) =>
  (source$: Observable<HttpRequestState<T>>) =>
    source$.pipe(
      map(response => response.error as ConduitErrorResponse | undefined),
      map(error => error?.error?.errors?.[key]),
    )

@Component({
  selector: 'conduit-register',
  standalone: true,
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SignalInputDirective, AsyncPipe, HttpClientModule, JsonPipe],
})
export class RegisterComponent {
  private userAndAuthService = inject(UserAndAuthenticationService)
  private userStore = inject(UserStore)

  registerForm = createFormGroup({
    username: createFormField('', { validators: [Validators.required()] }),
    email: createFormField('', { validators: [Validators.required(), emailValidator()] }),
    password: createFormField('', { validators: [Validators.required()] }),
  })

  private submitted = new Subject()
  private registerFormValue$ = toObservable(this.registerForm.value)

  registerRequest$ = this.submitted.pipe(
    withLatestFrom(this.registerFormValue$),
    switchMap(([,formValue]) =>
      this.userAndAuthService.register({ user: formValue }),
    ),
    tap((response) => {
      if (isLoadedState(response)) this.userStore.logIn(response.value.user)
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  requestError$ = this.registerRequest$.pipe(
    map(response => response.error as HttpErrorResponse | undefined),
    map(error => error?.message),
  )

  usernameServerErrors$ = this.registerRequest$.pipe(mapResponseErrors('username'))
  emailServerErrors$ = this.registerRequest$.pipe(mapResponseErrors('email'))

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
