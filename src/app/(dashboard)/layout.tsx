import { Sidebar } from '@/components/layouts/sidebar';
import { TopNavigation } from '@/components/layouts/top-navigation';
import { MobileNavigation } from '@/components/layouts/mobile-navigation';

export default function DashboardLayout({
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
        <div className="flex items-center gap-4 border-b bg-card px-4 md:hidden">
          <MobileNavigation />
          <TopNavigation />
        </div>
        <div className="hidden md:block">
          <TopNavigation />
        </div>
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
