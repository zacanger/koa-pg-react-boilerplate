import '../utils/test-utils'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from '../app'

void describe('example test', async () => {
  await it('renders', async () => {
    render(<App />)
    const b = screen.getByRole('button')
    assert.ok(b.innerText.includes("you've clicked 0 times"))
  })

  await it('increments', async () => {
    render(<App />)
    const b = screen.getByRole('button')
    await userEvent.click(b)
    assert.ok(b.innerText.includes("you've clicked 1 times"))
  })
})
