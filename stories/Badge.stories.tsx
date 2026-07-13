import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/ui/badge';

const meta: Meta<typeof Badge> = { title: 'UI/Badge', component: Badge, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Default', variant: 'default' } };
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive: Story = { args: { children: 'Destructive', variant: 'destructive' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
