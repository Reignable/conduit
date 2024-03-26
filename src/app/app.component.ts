import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HeaderComponent } from './header/header.component'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'conduit-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {
}
