import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { User } from '@model'

@Component({
  selector: 'conduit-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isLoggedIn = false
  @Input() token: User['token'] = ''
  @Input() username: User['username'] = ''
  @Input() image: User['image'] = ''
}
