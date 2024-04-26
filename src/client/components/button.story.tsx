import { Button } from './button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const BgColor: Story = {
  args: {
    bg: 'red',
    children: 'Click me',
  },
}

export const FgColor: Story = {
  args: {
    fg: 'red',
    children: 'Click me',
  },
}
