import { Sidebar } from '@/components/layouts/sidebar';
import { TopNavigation } from '@/components/layouts/top-navigation';
import { SettingsSidebar } from './settings-sidebar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <TopNavigation />
        <div className="flex flex-1 overflow-hidden">
          <SettingsSidebar />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
