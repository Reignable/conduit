import { render, screen } from '@testing-library/angular'
import { AppComponent } from './app.component'
import userEvent from '@testing-library/user-event'

describe('AppComponent', () => {
  it('should show the default value of the counter', async () => {
    await render(AppComponent)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('should increment the counter', async () => {
    await render(AppComponent)
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    expect(await screen.findByText('Count: 1')).toBeInTheDocument()
  })

  it('should decrement the counter', async () => {
    await render(AppComponent)
    userEvent.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(await screen.findByText('Count: -1')).toBeInTheDocument()
  })

  it('should reset the counter', async () => {
    await render(AppComponent)
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    expect(await screen.findByText('Count: 3')).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(await screen.findByText('Count: 0')).toBeInTheDocument()
  })

  it('should display the square of the value', async () => {
    await render(AppComponent)
    expect(screen.getByText('Square: 0')).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    expect(await screen.findByText('Square: 1')).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'Increment' }))
    expect(await screen.findByText('Square: 4')).toBeInTheDocument()
  })
})
