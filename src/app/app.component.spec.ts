import { render } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { byRole, byText } from 'testing-library-selector'
import { AppComponent } from './app.component'

const ui = {
  incrementButton: byRole('button', { name: 'Increment' }),
  decrementButton: byRole('button', { name: 'Decrement' }),
  resetButton: byRole('button', { name: 'Reset' }),
  count: (count: number) => byText(`Count: ${count}`),
  square: (square: number) => byText(`Square: ${square}`),
}

describe('AppComponent', () => {
  it('should show the default value of the counter', async () => {
    await render(AppComponent)
    expect(ui.count(0).get()).toBeInTheDocument()
  })

  it('should increment the counter', async () => {
    await render(AppComponent)
    await userEvent.click(ui.incrementButton.get())
    expect(await ui.count(1).find()).toBeInTheDocument()
  })

  it('should decrement the counter', async () => {
    await render(AppComponent)
    await userEvent.click(ui.decrementButton.get())
    expect(await ui.count(-1).find()).toBeInTheDocument()
  })

  it('should reset the counter', async () => {
    await render(AppComponent)
    await userEvent.click(ui.incrementButton.get())
    await userEvent.click(ui.incrementButton.get())
    await userEvent.click(ui.incrementButton.get())
    expect(await ui.count(3).find()).toBeInTheDocument()
    await userEvent.click(ui.resetButton.get())
    expect(await ui.count(0).find()).toBeInTheDocument()
  })

  it('should display the square of the value', async () => {
    await render(AppComponent)
    expect(ui.square(0).get()).toBeInTheDocument()
    await userEvent.click(ui.incrementButton.get())
    expect(await ui.square(1).find()).toBeInTheDocument()
    await userEvent.click(ui.incrementButton.get())
    expect(await ui.square(4).find()).toBeInTheDocument()
  })
})
