import Layout from '@/components/Layout';
import { testResults, tests, users, departments } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

export default function AdminResultsPage({ user, onHome, onLogout }: Props) {
  const getUser = (id: number) => users.find(u => u.id === id);
  const getDept = (id: number) => departments.find(d => d.id === id);
  const getTest = (id: number) => tests.find(t => t.id === id);

  const totalTests = testResults.length;
  const passed = testResults.filter(r => r.passed).length;
  const failed = testResults.filter(r => !r.passed).length;
  const passRate = Math.round((passed / totalTests) * 100);

  const deptStats = departments.map(dept => {
    const deptUsers = users.filter(u => u.deptId === dept.id);
    const deptResults = testResults.filter(r => deptUsers.some(u => u.id === r.userId));
    const deptPassed = deptResults.filter(r => r.passed).length;
    return {
      dept,
      total: deptResults.length,
      passed: deptPassed,
      failed: deptResults.length - deptPassed,
      rate: deptResults.length > 0 ? Math.round((deptPassed / deptResults.length) * 100) : 0,
    };
  }).filter(s => s.total > 0);

  return (
    <Layout title="Результаты и аналитика" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Аналитика по обучению</h2>
          <p className="text-muted-foreground text-sm">Динамика экспертности сотрудников по отделам</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Всего попыток', value: totalTests, icon: 'ClipboardList', color: 'text-[hsl(var(--corp-blue))]', bg: 'bg-blue-50' },
            { label: 'Сдали', value: passed, icon: 'CheckCircle2', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Не сдали', value: failed, icon: 'XCircle', color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Процент сдачи', value: `${passRate}%`, icon: 'TrendingUp', color: 'text-amber-600', bg: 'bg-amber-50' },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="corp-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h3 className="font-golos font-semibold text-foreground text-sm flex items-center gap-2">
                <Icon name="Building2" size={16} className="text-[hsl(var(--corp-blue))]" />
                По отделам
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {deptStats.map(({ dept, total, passed, rate }) => (
                <div key={dept.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{dept.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{passed}/{total}</span>
                      <span className={`font-semibold ${rate >= 85 ? 'text-emerald-600' : rate >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                        {rate}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${rate >= 85 ? 'bg-emerald-500' : rate >= 60 ? 'bg-amber-500' : 'bg-red-400'}`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="corp-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h3 className="font-golos font-semibold text-foreground text-sm flex items-center gap-2">
                <Icon name="BarChart3" size={16} className="text-[hsl(var(--corp-blue))]" />
                По тестам
              </h3>
            </div>
            <div className="divide-y divide-border">
              {tests.map(test => {
                const testRes = testResults.filter(r => r.testId === test.id);
                const testPassed = testRes.filter(r => r.passed).length;
                const testRate = testRes.length > 0 ? Math.round((testPassed / testRes.length) * 100) : 0;
                return (
                  <div key={test.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{test.title}</p>
                      <p className="text-xs text-muted-foreground">{testRes.length} попыток</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-base font-bold ${testRate >= 85 ? 'text-emerald-600' : testRate >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                        {testRate}%
                      </span>
                      <p className="text-xs text-muted-foreground">{testPassed} сдали</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="corp-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h3 className="font-golos font-semibold text-foreground text-sm flex items-center gap-2">
              <Icon name="Users" size={16} className="text-[hsl(var(--corp-blue))]" />
              Детальная история
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Сотрудник</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Отдел</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Тест</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Дата</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Результат</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {testResults.map(result => {
                  const u = getUser(result.userId);
                  const dept = u ? getDept(u.deptId) : null;
                  const test = getTest(result.testId);
                  return (
                    <tr key={result.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{u?.name || '—'}</td>
                      <td className="px-5 py-3 text-muted-foreground">{dept?.name || '—'}</td>
                      <td className="px-5 py-3 text-foreground">{test?.title || '—'}</td>
                      <td className="px-5 py-3 text-muted-foreground">{result.date}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className={`font-bold ${result.passed ? 'text-emerald-600' : 'text-red-500'}`}>
                            {result.score}%
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded border ${result.passed ? 'status-pass' : 'status-fail'}`}>
                            {result.passed ? 'Сдал' : 'Не сдал'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
