import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'conduit-home',
  standalone: true,
  template: `
    <h1>Conduit</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
