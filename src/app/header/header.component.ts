import {
  ChangeDetectionStrategy, Component,
  inject,
} from '@angular/core'
import { UserStore } from '@state'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'

@Component({
  selector: 'conduit-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [AvatarModule, MenubarModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  userStore = inject(UserStore)
}
