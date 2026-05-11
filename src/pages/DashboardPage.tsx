import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: 'worker' | 'admin' };
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const workerMenu = [
  {
    id: 'courses',
    icon: 'BookOpen',
    title: 'Курсы',
    description: 'Изучайте учебные материалы по программе обучения',
    badge: '4 курса',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: 'tests',
    icon: 'ClipboardCheck',
    title: 'Тесты',
    description: 'Пройдите тестирование по изученным материалам',
    badge: '3 теста',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'results',
    icon: 'BarChart2',
    title: 'Результаты',
    description: 'Просматривайте историю пройденных тестов',
    badge: 'История',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
];

const adminMenu = [
  {
    id: 'courses',
    icon: 'BookOpen',
    title: 'Курсы',
    description: 'Просмотр и изучение учебных материалов',
    badge: '4 курса',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: 'tests',
    icon: 'ClipboardCheck',
    title: 'Тесты',
    description: 'Просмотр и прохождение тестов',
    badge: '3 теста',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'admin-results',
    icon: 'BarChart3',
    title: 'Результаты',
    description: 'Аналитика и отчёты по обучению',
    badge: 'Аналитика',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    id: 'questions',
    icon: 'HelpCircle',
    title: 'Вопросы',
    description: 'Управление базой вопросов для тестов',
    badge: 'База знаний',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    id: 'employees',
    icon: 'Users',
    title: 'Сотрудники',
    description: 'Управление учётными записями пользователей',
    badge: '6 чел.',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
  },
  {
    id: 'topics',
    icon: 'Layers',
    title: 'Управление курсами',
    description: 'Создание и редактирование курсов и материалов',
    badge: 'Контент',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
  },
];

export default function DashboardPage({ user, onNavigate, onLogout }: Props) {
  const menu = user.role === 'admin' ? adminMenu : workerMenu;
  const isAdmin = user.role === 'admin';

  return (
    <Layout showHome={false} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Добро пожаловать,</p>
              <h1 className="font-golos font-bold text-foreground text-3xl">{user.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  isAdmin
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  <Icon name={isAdmin ? 'ShieldCheck' : 'User'} size={11} />
                  {isAdmin ? 'Администратор' : 'Сотрудник'}
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-center">
              {isAdmin ? (
                <>
                  <div>
                    <div className="font-golos font-bold text-foreground text-2xl">6</div>
                    <div className="text-muted-foreground text-xs">сотрудников</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-golos font-bold text-foreground text-2xl">4</div>
                    <div className="text-muted-foreground text-xs">курса</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-golos font-bold text-foreground text-2xl">71%</div>
                    <div className="text-muted-foreground text-xs">средний балл</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="font-golos font-bold text-foreground text-2xl">4</div>
                    <div className="text-muted-foreground text-xs">курса</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <div className="font-golos font-bold text-foreground text-2xl">3</div>
                    <div className="text-muted-foreground text-xs">теста</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {isAdmin ? 'Панель администратора' : 'Меню сотрудника'}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className={`grid gap-4 ${isAdmin ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
          {menu.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="corp-card p-5 text-left hover:shadow-md hover:border-[hsl(var(--corp-blue))]/40 transition-all group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon name={item.icon} size={22} className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-golos font-semibold text-foreground text-base">{item.title}</h3>
                    <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-[hsl(var(--corp-blue))] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
                  {item.badge && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-muted rounded border border-border text-muted-foreground font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
