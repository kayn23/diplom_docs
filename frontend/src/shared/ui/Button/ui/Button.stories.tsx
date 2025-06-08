import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'shared/ui/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Clear: Story = {
  args: {
    theme: 'clear',
  },
  render: ({ theme }) => <Button theme={theme}>Clear</Button>,
};

export const Primary: Story = {
  args: {
    theme: 'primary',
  },
  render: ({ theme }) => <Button theme={theme}>Primary</Button>,
};
