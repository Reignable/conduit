import { faker } from '@faker-js/faker'
import {
  test as base, expect, Page,
} from '@playwright/test'

const createRegisterUi = (page: Page) => ({
  usernameInput: () => page.getByLabel(/username$/i),
  usernameError: () => page.getByLabel(/username error/i),
  emailInput: () => page.getByLabel(/email$/i),
  emailError: () => page.getByLabel(/email error/i),
  passwordInput: () => page.getByLabel(/password$/i),
  passwordError: () => page.getByLabel(/password error/i),
  signUpButton: () => page.getByRole('button', { name: /sign up/i }),
})

type UI = ReturnType<typeof createRegisterUi>

const test = base.extend<{ ui: UI }>({
  ui: ({ page }, use) => use(createRegisterUi(page)),
})

test('validates the inputs correctly', async ({ page, ui }) => {
  await page.goto('/register')
  await ui.signUpButton().click()
  expect(ui.usernameError()).toHaveText('A username is required')
  expect(ui.emailError()).toHaveText('An email is required')
  expect(ui.passwordError()).toHaveText('A password is required')
  await ui.emailInput().fill('invalid-email')
  expect(ui.emailError()).toContainText('Please enter a valid email')
})

test('allows the user to register', async ({ page, ui }) => {
  const username = faker.internet.userName()
  await page.goto('/register')
  await ui.usernameInput().fill(username)
  await ui.emailInput().fill(faker.internet.email())
  await ui.passwordInput().fill(faker.internet.password())
  await ui.signUpButton().click()
  await page.waitForURL('/home')
  expect(page.getByRole('link', { name: username })).toBeVisible()
  expect(page.getByRole('heading', { name: /conduit/i })).toBeVisible()
})

test('shows an error message if the username or email is already taken', async ({ page, ui }) => {
  await page.goto('/register')
  await ui.usernameInput().fill('TAKEN_USERNAME')
  await ui.emailInput().fill(faker.internet.email())
  await ui.passwordInput().fill(faker.internet.password())
  await ui.signUpButton().click()
  const response = await page.waitForResponse('/users')
  const body = await response.json()
  const { username, email } = body.errors
  await expect(ui.usernameError()).toHaveText(username[0])
  await expect(ui.emailError()).toHaveText(email[0])
  await ui.usernameInput().fill(faker.internet.userName())
  await ui.signUpButton().click()
  expect(ui.usernameError()).not.toBeAttached()
  expect(ui.emailError()).not.toBeAttached()
})

test('shows a generic error message if the server fails', async ({ page, ui }) => {
  await page.goto('/register')
  await ui.usernameInput().fill('FAIL')
  await ui.emailInput().fill(faker.internet.email())
  await ui.passwordInput().fill(faker.internet.password())
  await ui.signUpButton().click()
  await expect(page.getByText('Server error')).toBeVisible()
})
