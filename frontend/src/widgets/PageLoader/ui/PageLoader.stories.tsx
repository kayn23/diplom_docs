import { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from './PageLoader';

const meta = {
  title: 'widget/PageLoader',
  component: PageLoader,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PageLoader>;

export default meta;

type Story = StoryObj<typeof PageLoader>;

export const Clear: Story = {};
