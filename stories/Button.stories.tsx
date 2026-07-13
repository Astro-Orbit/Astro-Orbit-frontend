import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button';
import { fn } from '@storybook/test';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Button', variant: 'default' } };
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive: Story = { args: { children: 'Destructive', variant: 'destructive' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } };
export const Link: Story = { args: { children: 'Link', variant: 'link' } };
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } };
export const Small: Story = { args: { children: 'Small', size: 'sm' } };
export const Large: Story = { args: { children: 'Large', size: 'lg' } };
