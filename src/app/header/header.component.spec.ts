import { render, screen } from '@testing-library/angular'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  it('should show the app name as a home link', async () => {
    await render(HeaderComponent)

    expect(screen.getByRole('link', { name: /conduit/i })).toHaveAttribute('href', '/')
  })

  it('should show a home link', async () => {
    await render(HeaderComponent)

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
  })

  describe('unauthenticated user', () => {
    it('should show a login link', async () => {
      await render(HeaderComponent)

      expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login')
    })

    it('should show a register link', async () => {
      await render(HeaderComponent)

      expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/register')
    })
  })

  describe('authenticated user', () => {
    it.todo('should show a new article link')

    it.todo('should show a settings link')

    it.todo('should show a profile link')

    it.todo('should show the user image')

    it.todo("should show the user's name")
  })
})
