import { computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@model'
import {
  patchState,
  signalStore, withComputed, withMethods, withState,
} from '@ngrx/signals'

type UserState = {
  user: User
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: {
      token: '',
      username: '',
      bio: '',
      image: '',
      email: '',
    },
  }),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => !!user.token()),
  })),
  withMethods((store, router = inject(Router)) => ({
    logIn: (user: User) => {
      patchState(store, { user })
      router.navigate(['/home'])
    },
  })),
)
