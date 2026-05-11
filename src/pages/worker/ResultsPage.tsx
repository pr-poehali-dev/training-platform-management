import Layout from '@/components/Layout';
import { testResults, tests } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string; login: string };
  onHome: () => void;
  onLogout: () => void;
  extraResults?: { testId: number; score: number; passed: boolean }[];
}

const USER_ID = 1;

export default function ResultsPage({ user, onHome, onLogout, extraResults = [] }: Props) {
  const myResults = testResults.filter(r => r.userId === USER_ID);

  const allResults = [
    ...myResults,
    ...extraResults.map((r, i) => ({
      id: 1000 + i,
      userId: USER_ID,
      testId: r.testId,
      score: r.score,
      passed: r.passed,
      date: new Date().toISOString().split('T')[0],
    })),
  ];

  const getTest = (testId: number) => tests.find(t => t.id === testId);

  const passed = allResults.filter(r => r.passed).length;
  const failed = allResults.filter(r => !r.passed).length;
  const avg = allResults.length > 0
    ? Math.round(allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length)
    : 0;

  return (
    <Layout title="Мои результаты" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Мои результаты</h2>
          <p className="text-muted-foreground text-sm">История пройденных тестирований</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Пройдено тестов', value: allResults.length, icon: 'ClipboardCheck', color: 'text-[hsl(var(--corp-blue))]', bg: 'bg-blue-50' },
            { label: 'Успешно сдано', value: passed, icon: 'CheckCircle2', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Средний балл', value: `${avg}%`, icon: 'BarChart2', color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map(stat => (
            <div key={stat.label} className="corp-card p-5">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div className="font-golos font-bold text-foreground text-2xl">{stat.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {allResults.length === 0 ? (
          <div className="corp-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon name="ClipboardList" size={28} className="text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">Нет пройденных тестов</p>
            <p className="text-muted-foreground text-sm">Пройдите тесты, и результаты появятся здесь</p>
          </div>
        ) : (
          <div className="corp-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h3 className="font-golos font-semibold text-foreground text-sm">История тестирований</h3>
            </div>
            <div className="divide-y divide-border">
              {allResults.map(result => {
                const test = getTest(result.testId);
                return (
                  <div key={result.id} className="px-5 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${result.passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
                      <Icon
                        name={result.passed ? 'CheckCircle2' : 'XCircle'}
                        size={20}
                        className={result.passed ? 'text-emerald-600' : 'text-red-500'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{test?.title || 'Тест'}</p>
                      <p className="text-muted-foreground text-xs">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${result.passed ? 'text-emerald-600' : 'text-red-500'}`}>
                        {result.score}%
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${result.passed ? 'status-pass' : 'status-fail'}`}>
                        {result.passed ? 'Сдал' : 'Не сдал'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {failed > 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Icon name="AlertTriangle" size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium text-sm">Есть несданные тесты</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Рекомендуем повторно изучить учебные материалы и пересдать тесты со статусом «Не сдал».
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
