import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'dashboard' | 'employees' | 'fleet' | 'routes' | 'reports';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard' as Page, label: 'Главная', icon: 'LayoutDashboard' },
  { id: 'employees' as Page, label: 'Сотрудники', icon: 'Users' },
  { id: 'fleet' as Page, label: 'Подвижной состав', icon: 'Bus' },
  { id: 'routes' as Page, label: 'Маршруты', icon: 'Route' },
  { id: 'reports' as Page, label: 'Отчёты', icon: 'FileText' },
];

export default function Layout({ children, activePage, onNavigate, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex h-screen overflow-hidden font-ibm" style={{ background: 'hsl(var(--background))' }}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'hsl(var(--sidebar-background))' }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
          <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--accent))' }}>
            <Icon name="Bus" size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">АвтоПарк</div>
            <div className="text-xs" style={{ color: 'hsl(var(--sidebar-foreground))' }}>Система управления</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3 px-3" style={{ color: 'hsl(215 20% 40%)' }}>
            Навигация
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
              className={`sidebar-link w-full text-left ${activePage === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} fallback="Circle" size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'hsl(var(--primary))' }}>
              АД
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Администратор</div>
              <div className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>Диспетчер</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="sidebar-link w-full text-left"
          >
            <Icon name="LogOut" size={16} />
            <span>Выход</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-3 border-b bg-white flex-shrink-0" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-1.5 rounded hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name="Menu" size={20} className="text-foreground" />
            </button>
            <div>
              <div className="font-semibold text-sm text-foreground">
                {navItems.find(n => n.id === activePage)?.label}
              </div>
              <div className="text-xs text-muted-foreground capitalize">{currentDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded hover:bg-muted transition-colors">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
            </button>
            <button className="p-2 rounded hover:bg-muted transition-colors">
              <Icon name="Settings" size={18} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
