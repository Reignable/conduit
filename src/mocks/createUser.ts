import { User } from '@model'
import { faker } from '@faker-js/faker'

export const createUser = (overrides: Partial<User> = {}): User => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return ({
    bio: faker.lorem.sentence(),
    image: faker.image.avatarGitHub(),
    token: faker.string.uuid(),
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.userName({ firstName, lastName }),
    ...overrides,
  })
}
