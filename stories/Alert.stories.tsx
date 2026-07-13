import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../src/components/ui/alert';
import { Info, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Alert> = { title: 'UI/Alert', component: Alert, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-80"><Info className="h-4 w-4" /><AlertTitle>Note</AlertTitle><AlertDescription>This is informational.</AlertDescription></Alert>
  ),
};
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-80"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
  ),
};
