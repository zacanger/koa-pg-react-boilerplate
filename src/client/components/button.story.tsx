import { Button } from './button'

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export const Bg = {
  args: {
    backgroundColor: 'red',
  },
}

export const Fg = {
  args: {
    color: 'red',
  },
}
