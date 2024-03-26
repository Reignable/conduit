import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy, Component,
} from '@angular/core'
import {
  FormsModule,
} from '@angular/forms'
import {
  SignalInputDirective,
  ValidatorFn,
  Validators,
  createFormField,
  createFormGroup,
} from 'ng-signal-forms'

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
  imports: [FormsModule, SignalInputDirective, AsyncPipe],
})
export class RegisterComponent {
  registerForm = createFormGroup({
    username: createFormField('', { validators: [Validators.required()] }),
    email: createFormField('', { validators: [Validators.required(), emailValidator()] }),
    password: createFormField('', { validators: [Validators.required()] }),
  })

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
  }
}
