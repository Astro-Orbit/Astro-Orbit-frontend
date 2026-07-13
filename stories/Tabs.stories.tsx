import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/ui/tabs';

const meta: Meta<typeof Tabs> = { title: 'UI/Tabs', component: Tabs, parameters: { layout: 'centered' }, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="a" className="w-80">
      <TabsList><TabsTrigger value="a">Tab A</TabsTrigger><TabsTrigger value="b">Tab B</TabsTrigger></TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>
  ),
};
