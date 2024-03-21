import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core'
import { User } from '@model'
import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button'
import { AvatarModule } from 'primeng/avatar'

@Component({
  selector: 'conduit-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [AvatarModule, MenubarModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  _isLoggedIn = signal(false)
  @Input() set isLoggedIn(value: boolean) { this._isLoggedIn.set(value) }

  _token = signal<User['token']>('')
  @Input() set token(value: User['token']) { this._token.set(value) }

  _username = signal<User['username']>('')
  @Input() set username(value: User['username']) { this._username.set(value) }

  _image = signal<User['image']>('')
  @Input() set image(value: User['image']) { this._image.set(value) }
}
