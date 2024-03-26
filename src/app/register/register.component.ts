import {
  ChangeDetectionStrategy, Component, inject,
} from '@angular/core'
import {
  FormBuilder, ReactiveFormsModule, Validators,
} from '@angular/forms'

@Component({
  selector: 'conduit-register',
  standalone: true,
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
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
    if (this.registerForm.invalid) return
    console.log(this.registerForm.value)
  }
}
