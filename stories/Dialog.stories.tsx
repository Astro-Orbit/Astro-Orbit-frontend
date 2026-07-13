import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../src/components/ui/dialog';
import { Button } from '../src/components/ui/button';

const meta: Meta<typeof Dialog> = { title: 'UI/Dialog', component: Dialog, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader><DialogTitle>Confirm</DialogTitle><DialogDescription>Are you sure?</DialogDescription></DialogHeader>
        <DialogFooter><Button variant="outline">Cancel</Button><Button>Confirm</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
