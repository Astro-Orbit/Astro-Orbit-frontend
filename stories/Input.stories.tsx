import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/ui/input';

const meta: Meta<typeof Input> = { title: 'UI/Input', component: Input, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Enter text...' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled' } };
