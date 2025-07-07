// src/components/ui/atoms/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'

import { Button } from './button'

// The main exhibit plaque
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta

// A type helper for our stories
type Story = StoryObj<typeof Button>

// The "Primary" story (our first exhibit)
export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Primary Button',
  },
}

// The "Secondary" story (our second exhibit)
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

// The "Destructive" story (our third exhibit)
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}
