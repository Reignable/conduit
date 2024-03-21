import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core'
import { User } from '@model'
import { MenuItem } from 'primeng/api'
import { MenubarModule } from 'primeng/menubar'

@Component({
  selector: 'conduit-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: [`
  :host ::ng-deep p-menubarsub {
    width: 100%;
}
  `],
  imports: [MenubarModule],
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
