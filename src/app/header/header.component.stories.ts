import { Meta, StoryObj } from '@storybook/angular'
import { HeaderComponent } from './header.component'
import { faker } from '@faker-js/faker'

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
}

export default meta
type Story = StoryObj<HeaderComponent>

export const Unauthenticated: Story = {}

export const Authenticated: Story = {
  args: {
    isLoggedIn: true,
    username: faker.internet.userName(),
    image: faker.image.avatarGitHub(),
    token: faker.string.uuid(),
  },
}

export const AuthenticatedNoUser: Story = {
  args: {
    isLoggedIn: true,
  },
}
