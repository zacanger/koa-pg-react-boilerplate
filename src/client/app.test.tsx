import { App } from './app'
import { render, screen, userEvent } from './utils/test.utils'
import { describe, it } from 'vitest'

describe('example test', () => {
  it('renders', () => {
    render(<App />)
    expect(screen.getByText(/you've clicked/i)).toBeInTheDocument()
  })

  it('increments', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button'))
    expect(await screen.findByText(/1 times/i)).toBeInTheDocument()
  })
})
