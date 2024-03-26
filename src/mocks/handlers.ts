import {
  HttpResponse, PathParams, http,
} from 'msw'
import {
  ErrorResponse,
  RegisterRequest, UserResponse,
} from '@model'
import { createUser } from './createUser'

const registerHandler = http.post<PathParams, RegisterRequest>('/users',
  async ({ request }) => {
    const body = await request.json()
    const {
      email, username,
    } = body.user

    if (username === 'FAIL') {
      return new HttpResponse('Server error', { status: 500, statusText: 'Internal Server Error' })
    }

    if (username === 'TAKEN_USERNAME') {
      return HttpResponse.json<ErrorResponse>(
        {
          errors: {
            username: ['is already taken'], email: ['is already taken'],
          },
        },
        { status: 422 },
      )
    }

    return HttpResponse.json<UserResponse>({
      user: createUser({
        email,
        username,
      }),
    })
  })

export const handlers = [
  registerHandler,
]
