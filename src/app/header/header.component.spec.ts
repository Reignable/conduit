import { render } from '@testing-library/angular'
import { byRole } from 'testing-library-selector'
import { HeaderComponent } from './header.component'

const ui = {
  appName: byRole('link', { name: /conduit/i }),
  home: byRole('link', { name: /home/i }),
  signIn: byRole('link', { name: /sign in/i }),
  signUp: byRole('link', { name: /sign up/i }),
  newArticle: byRole('link', { name: /new article/i }),
  settings: byRole('link', { name: /settings/i }),
  profile: byRole('link', { name: /test user/i }),
  userImage: byRole('img', { name: /test user profile image/i }),

}

describe('HeaderComponent', () => {
  it('should show the app name as a home link', async () => {
    await render(HeaderComponent)

    expect(ui.appName.get()).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('should show a home link', async () => {
    await render(HeaderComponent)

    expect(ui.home.get()).toHaveAttribute(
      'href',
      '/',
    )
  })

  describe('unauthenticated user', () => {
    it('should show a login link', async () => {
      await render(HeaderComponent)

      expect(ui.signIn.get()).toHaveAttribute(
        'href',
        '/login',
      )
    })

    it('should show a register link', async () => {
      await render(HeaderComponent)

      expect(ui.signUp.get()).toHaveAttribute(
        'href',
        '/register',
      )
    })
  })

  describe('authenticated user', () => {
    it('should not show a login or register link', async () => {
      await render(HeaderComponent, {
        componentInputs: { isLoggedIn: true },
      })

      expect(
        ui.signIn.query(),
      ).not.toBeInTheDocument()
      expect(
        ui.signUp.query(),
      ).not.toBeInTheDocument()
    })
  })

  it('should show a new article link', async () => {
    await render(HeaderComponent, {
      componentInputs: { isLoggedIn: true },
    })

    expect(ui.newArticle.get()).toHaveAttribute(
      'href',
      '/editor',
    )
  })

  it('should show a settings link', async () => {
    await render(HeaderComponent, {
      componentInputs: { isLoggedIn: true },
    })

    expect(ui.settings.get()).toHaveAttribute(
      'href',
      '/settings',
    )
  })

  it('should show a profile link', async () => {
    const username = 'Test User'
    const token = 'test-user'
    await render(HeaderComponent, {
      componentInputs: { isLoggedIn: true, username, token },
    })

    expect(ui.profile.get()).toHaveAttribute(
      'href',
      '/profile/test-user',
    )
  })

  it('should show the user image', async () => {
    const username = 'Test User'
    const image = 'https://static.productionready.io/images/smiley-cyrus.jpg'
    await render(HeaderComponent, {
      componentInputs: { isLoggedIn: true, username, image },
    })

    expect(ui.userImage.get()).toHaveAttribute(
      'src',
      image,
    )
  })
})
