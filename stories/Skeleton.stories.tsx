import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/components/ui/skeleton';

const meta: Meta<typeof Skeleton> = { title: 'UI/Skeleton', component: Skeleton, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { args: { className: 'h-4 w-48' } };
export const Card: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3 rounded-xl border p-4">
      <Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-full" /><Skeleton className="h-24 w-full" />
    </div>
  ),
};
