import { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import LoginPage from '@/pages/LoginPage';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Employees from '@/pages/Employees';
import Fleet from '@/pages/Fleet';
import Routes from '@/pages/Routes';
import Reports from '@/pages/Reports';

type Page = 'dashboard' | 'employees' | 'fleet' | 'routes' | 'reports';

export default function App() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState<Page>('dashboard');

  if (!username) {
    return (
      <TooltipProvider>
        <LoginPage onLogin={(name) => setUsername(name)} />
      </TooltipProvider>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'fleet': return <Fleet />;
      case 'routes': return <Routes />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <TooltipProvider>
      <Layout activePage={page} onNavigate={setPage} onLogout={() => setUsername('')} username={username}>
        {renderPage()}
      </Layout>
    </TooltipProvider>
  );
}