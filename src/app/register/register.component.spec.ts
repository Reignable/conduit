import userEvent from '@testing-library/user-event'
import { RegisterComponent } from './register.component'
import { render } from '@testing-library/angular'
import { byLabelText, byRole } from 'testing-library-selector'

const renderRegisterComponent = () =>
  render(RegisterComponent)

const ui = {
  usernameInput: byLabelText(/username/i),
  usernameError: byRole('alert', { name: /username error/i }),
  emailInput: byLabelText(/email$/i),
  passwordInput: byLabelText(/password/i),
  passwordError: byRole('alert', { name: /password error/i }),
  submitButton: byRole('button', { name: /sign up/i }),
  emailError: byRole('alert', { name: /email error/i }),
}

describe(RegisterComponent, () => {
  it('validates the username', async () => {
    await renderRegisterComponent()
    await userEvent.click(ui.submitButton.get())
    expect(ui.usernameError.get().textContent?.trim()).toMatchInlineSnapshot('"A username is required"')
  })

  it('validates the password', async () => {
    await renderRegisterComponent()
    await userEvent.click(ui.submitButton.get())
    expect(ui.passwordError.get().textContent?.trim()).toMatchInlineSnapshot('"A password is required"')
  })

  it('validates the email', async () => {
    await renderRegisterComponent()
    await userEvent.type(ui.usernameInput.get(), 'test')
    await userEvent.type(ui.passwordInput.get(), 'password')
    expect(ui.emailError.query()).not.toBeInTheDocument()
    await userEvent.click(ui.submitButton.get())
    expect(ui.emailError.get().textContent?.trim()).toMatchInlineSnapshot('"An email is required"')
    await userEvent.type(ui.emailInput.get(), 'invalid-email')
    await userEvent.tab()
    expect(ui.emailError.get().textContent?.trim()).toMatchInlineSnapshot('"Please enter a valid email"')
  })

  it.todo('allows the user to register')

  it.todo('shows an error message if the username or email is already taken')

  it.todo('shows a generic error message if the server fails')
})
