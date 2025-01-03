import { Meta, StoryObj } from '@storybook/react';
import { ErrorFallback } from './ErrorFallback';

const meta = {
  title: 'widget/ErrorFallback',
  component: ErrorFallback,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const Clear: Story = {};
