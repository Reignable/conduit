import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'

const DEFAULT_COUNT = 0

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  count = signal(DEFAULT_COUNT)
  square = computed(() => this.count() ** 2)

  increment() {
    this.count.update(value => value + 1)
  }

  decrement() {
    this.count.update(value => value - 1)
  }

  reset() {
    this.count.set(DEFAULT_COUNT)
  }
}
