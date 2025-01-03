import { Meta, StoryObj } from '@storybook/react';
import { BaseLink } from './BaseLink';

const meta = {
  title: 'shared/ui/BaseLink',
  component: BaseLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    to: '/',
    children: 'BaseLink',
  },
} satisfies Meta<typeof BaseLink>;

export default meta;

type Story = StoryObj<typeof BaseLink>;

export const Clear: Story = {};
