import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onHome?: () => void;
  showHome?: boolean;
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export default function Layout({ children, title, onHome, showHome = true, user, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="corp-header text-white shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {showHome && (
                <button
                  onClick={onHome}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  <Icon name="ChevronLeft" size={16} />
                  На главную
                </button>
              )}
              <div className="flex items-center gap-3">
                {showHome && <div className="w-px h-5 bg-white/20" />}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[hsl(var(--corp-blue))]/20 flex items-center justify-center">
                    <Icon name="GraduationCap" size={18} className="text-[hsl(var(--corp-blue))]" />
                  </div>
                  <span className="font-golos font-semibold text-white tracking-wide text-sm uppercase">
                    КорпЛМС
                  </span>
                </div>
              </div>
            </div>

            {title && (
              <h1 className="font-golos font-semibold text-white text-base tracking-wide">{title}</h1>
            )}

            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-white/50 text-xs">
                      {user.role === 'admin' ? 'Администратор' : 'Сотрудник'}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[hsl(var(--corp-blue))]/20 border border-[hsl(var(--corp-blue))]/30 flex items-center justify-center">
                    <Icon name="User" size={18} className="text-[hsl(var(--corp-blue))]" />
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-white/50 hover:text-white transition-colors ml-1"
                    title="Выйти"
                  >
                    <Icon name="LogOut" size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-border bg-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-xs">
          © 2025 КорпЛМС — Корпоративная система управления обучением
        </div>
      </footer>
    </div>
  );
}
