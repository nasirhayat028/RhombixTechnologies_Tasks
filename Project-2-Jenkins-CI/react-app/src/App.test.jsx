import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /jenkins ci demo app/i })).toBeInTheDocument()
  })

  it('increments and decrements the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 0')

    await user.click(screen.getByRole('button', { name: /increment/i }))
    await user.click(screen.getByRole('button', { name: /increment/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 2')

    await user.click(screen.getByRole('button', { name: /decrement/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 1')

    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 0')
  })

  it('renders the seeded tasks', () => {
    render(<App />)
    expect(screen.getByText('Set up Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

  it('adds a new task from the input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('new-task'), 'Deploy app')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    expect(screen.getByText('Deploy app')).toBeInTheDocument()
  })

  it('removes a task from the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'remove-Write tests' }))

    expect(screen.queryByText('Write tests')).not.toBeInTheDocument()
    expect(screen.getByText('Set up Jenkins')).toBeInTheDocument()
  })
})
