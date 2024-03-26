import {
  test as base, expect, Page,
} from '@playwright/test'

const createRegisterUi = (page: Page) => ({
  usernameError: () => page.getByLabel(/username error/i),
  emailInput: () => page.getByLabel(/email$/i),
  emailError: () => page.getByLabel(/email error/i),
  passwordError: () => page.getByLabel(/password error/i),
  signUpButton: () => page.getByRole('button', { name: /sign up/i }),
})

type UI = ReturnType<typeof createRegisterUi>

const test = base.extend<{ ui: UI }>({
  ui: ({ page }, use) => use(createRegisterUi(page)),
})

test.describe('Register', () => {
  test('validates the inputs correctly', async ({ page, ui }) => {
    await page.goto('/register')
    await ui.signUpButton().click()
    expect(ui.usernameError()).toHaveText('A username is required')
    expect(ui.emailError()).toHaveText('An email is required')
    expect(ui.passwordError()).toHaveText('A password is required')
    await ui.emailInput().fill('invalid-email')
    expect(ui.emailError()).toContainText('Please enter a valid email')
  })

  // test('allows the user to register')

  // test('shows an error message if the username or email is already taken')

  // test('shows a generic error message if the server fails')
})
