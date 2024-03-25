import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'conduit-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent],
})
export class AppComponent {
}
