import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../src/components/ui/card';

const meta: Meta<typeof Card> = { title: 'UI/Card', component: Card, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Description</CardDescription></CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};
