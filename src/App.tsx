import { useState } from 'react';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import CoursesPage from '@/pages/worker/CoursesPage';
import TestsPage from '@/pages/worker/TestsPage';
import ResultsPage from '@/pages/worker/ResultsPage';
import AdminResultsPage from '@/pages/admin/AdminResultsPage';
import QuestionsPage from '@/pages/admin/QuestionsPage';
import EmployeesPage from '@/pages/admin/EmployeesPage';
import TopicsPage from '@/pages/admin/TopicsPage';

type Page =
  | 'login'
  | 'dashboard'
  | 'courses'
  | 'tests'
  | 'results'
  | 'admin-results'
  | 'questions'
  | 'employees'
  | 'topics';

interface User {
  name: string;
  role: 'worker' | 'admin';
  login: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('login');
  const [testResults, setTestResults] = useState<{ testId: number; score: number; passed: boolean }[]>([]);

  const handleLogin = (u: User) => {
    setUser(u);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
    setTestResults([]);
  };

  const navigate = (p: string) => setPage(p as Page);
  const goHome = () => setPage('dashboard');

  const handleTestComplete = (result: { testId: number; score: number; passed: boolean }) => {
    setTestResults(prev => [...prev, result]);
  };

  if (!user || page === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  const commonProps = { user, onHome: goHome, onLogout: handleLogout };

  switch (page) {
    case 'dashboard':
      return <DashboardPage user={user} onNavigate={navigate} onLogout={handleLogout} />;

    case 'courses':
      return <CoursesPage {...commonProps} />;

    case 'tests':
      return (
        <TestsPage
          {...commonProps}
          onTestComplete={handleTestComplete}
        />
      );

    case 'results':
      return <ResultsPage {...commonProps} extraResults={testResults} />;

    case 'admin-results':
      return <AdminResultsPage {...commonProps} />;

    case 'questions':
      return <QuestionsPage {...commonProps} />;

    case 'employees':
      return <EmployeesPage {...commonProps} />;

    case 'topics':
      return <TopicsPage {...commonProps} />;

    default:
      return <DashboardPage user={user} onNavigate={navigate} onLogout={handleLogout} />;
  }
}
