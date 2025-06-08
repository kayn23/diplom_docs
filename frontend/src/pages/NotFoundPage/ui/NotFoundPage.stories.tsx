import { Meta, StoryObj } from '@storybook/react';
import { NotFoundPage } from './NotFoundPage';

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Clear: Story = {};
