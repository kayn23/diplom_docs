import { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta = {
  title: 'shared/ui/Loader',
  component: Loader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof Loader>;

export const Clear: Story = {};
