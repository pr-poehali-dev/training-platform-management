import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LoginPageProps {
  onLogin: (user: { name: string; role: 'worker' | 'admin'; login: string }) => void;
}

const DEMO_USERS = [
  { login: 'ivanov', password: '123456', name: 'Иванов Алексей Петрович', role: 'worker' as const, dept: 'Отдел продаж' },
  { login: 'admin', password: 'admin123', name: 'Смирнова Елена Викторовна', role: 'admin' as const, dept: 'Управление' },
  { login: 'petrov', password: '123456', name: 'Петров Дмитрий Сергеевич', role: 'worker' as const, dept: 'ИТ-отдел' },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.login === login && u.password === password);
      if (user) {
        onLogin({ name: user.name, role: user.role, login: user.login });
      } else {
        setError('Неверный логин или пароль. Проверьте данные и попробуйте снова.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'hsl(var(--corp-navy))' }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/30"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--corp-blue))]/20 flex items-center justify-center">
              <Icon name="GraduationCap" size={22} className="text-[hsl(var(--corp-blue))]" />
            </div>
            <span className="font-golos font-bold text-white text-xl tracking-widest uppercase">КорпЛМС</span>
          </div>
          <div className="w-8 h-0.5 bg-[hsl(var(--corp-blue))] ml-0.5 mt-1" />
        </div>

        <div className="relative z-10">
          <h2 className="font-golos font-bold text-white text-4xl leading-tight mb-6">
            Корпоративная<br />
            система<br />
            обучения
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-xs">
            Повышайте квалификацию сотрудников, отслеживайте прогресс и управляйте знаниями компании.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          {[
            { icon: 'BookOpen', label: 'Курсы и материалы' },
            { icon: 'ClipboardCheck', label: 'Тестирование' },
            { icon: 'BarChart3', label: 'Аналитика' },
          ].map(item => (
            <div key={item.icon} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon name={item.icon} size={18} className="text-[hsl(var(--corp-blue))]" />
              </div>
              <span className="text-white/40 text-xs text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[hsl(var(--background))]">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 lg:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-corp-navy flex items-center justify-center">
              <Icon name="GraduationCap" size={18} className="text-[hsl(var(--corp-blue))]" />
            </div>
            <span className="font-golos font-bold text-foreground text-lg tracking-widest uppercase">КорпЛМС</span>
          </div>

          <div className="mb-8">
            <h1 className="font-golos font-bold text-foreground text-3xl mb-2">Вход в систему</h1>
            <p className="text-muted-foreground text-sm">Введите корпоративные учётные данные</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Логин</label>
              <div className="relative">
                <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  placeholder="Введите логин"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))] focus:border-transparent text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))] focus:border-transparent text-sm transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <Icon name="AlertCircle" size={16} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} />
                  Войти
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-2">Демо-доступ:</p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">Сотрудник: <span className="text-foreground">ivanov / 123456</span></p>
              <p className="text-xs text-muted-foreground font-mono">Администратор: <span className="text-foreground">admin / admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
