import 'global-jsdom/register'
import { afterEach, describe, it } from 'node:test'
import * as assert from 'node:assert'
import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Home } from '../components/home'

void describe('example test', async () => {
  afterEach(() => {
    cleanup()
  })

  await it('renders home', async () => {
    render(<Home />)
    const b = screen.getByRole('button')
    assert.ok(b.innerHTML.includes("you've clicked 0 times"))
    await userEvent.click(b)
    assert.ok(b.innerHTML.includes("you've clicked 1 times"))
  })
})
