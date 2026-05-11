import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { departments } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const GET_USERS_URL = 'https://functions.poehali.dev/f8245652-371b-40fc-8887-b3965d2e7b07';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

interface Employee {
  user_id: number;
  full_name: string;
  login: string;
  role: 'worker' | 'admin';
  department_id: number | null;
  department_name: string | null;
}

export default function EmployeesPage({ user, onHome, onLogout }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Employee>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ full_name: '', login: '', role: 'worker' as const, department_id: 1 });

  useEffect(() => {
    setLoading(true);
    fetch(GET_USERS_URL)
      .then(r => r.json())
      .then(data => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        setEmployees(parsed.users || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить список сотрудников');
        setLoading(false);
      });
  }, []);

  const startEdit = (emp: Employee) => {
    setEditingId(emp.user_id);
    setEditData({ full_name: emp.full_name, login: emp.login, role: emp.role, department_id: emp.department_id ?? 1 });
  };

  const saveEdit = () => {
    setEmployees(prev => prev.map(e =>
      e.user_id === editingId
        ? {
            ...e,
            ...editData,
            department_name: departments.find(d => d.id === editData.department_id)?.name ?? e.department_name,
          }
        : e
    ));
    setEditingId(null);
  };

  const addEmployee = () => {
    if (!newEmployee.full_name.trim() || !newEmployee.login.trim()) return;
    const newId = Math.max(...employees.map(e => e.user_id), 0) + 1;
    const dept = departments.find(d => d.id === newEmployee.department_id);
    setEmployees(prev => [...prev, {
      user_id: newId,
      full_name: newEmployee.full_name,
      login: newEmployee.login,
      role: newEmployee.role,
      department_id: newEmployee.department_id,
      department_name: dept?.name ?? null,
    }]);
    setNewEmployee({ full_name: '', login: '', role: 'worker', department_id: 1 });
    setShowAdd(false);
  };

  return (
    <Layout title="Сотрудники" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Сотрудники</h2>
            <p className="text-muted-foreground text-sm">
              {loading ? 'Загрузка...' : `${employees.length} сотрудников в системе`}
            </p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm"
          >
            <Icon name="UserPlus" size={16} />
            Добавить сотрудника
          </button>
        </div>

        {showAdd && (
          <div className="corp-card p-5 mb-5 border-[hsl(var(--corp-blue))]/30 border-2 animate-fade-in">
            <h3 className="font-golos font-semibold text-foreground text-sm mb-4">Новый сотрудник</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">ФИО</label>
                <input
                  value={newEmployee.full_name}
                  onChange={e => setNewEmployee(p => ({ ...p, full_name: e.target.value }))}
                  placeholder="Фамилия Имя Отчество"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Логин</label>
                <input
                  value={newEmployee.login}
                  onChange={e => setNewEmployee(p => ({ ...p, login: e.target.value }))}
                  placeholder="ivanov.i"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Отдел</label>
                <select
                  value={newEmployee.department_id}
                  onChange={e => setNewEmployee(p => ({ ...p, department_id: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                >
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Роль</label>
                <select
                  value={newEmployee.role}
                  onChange={e => setNewEmployee(p => ({ ...p, role: e.target.value as 'worker' | 'admin' }))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                >
                  <option value="worker">Сотрудник</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={addEmployee} className="px-4 py-2 bg-[hsl(var(--corp-navy))] text-white text-sm font-semibold rounded-lg hover:bg-[hsl(221,70%,26%)] transition-all">Сохранить</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-muted transition-all">Отмена</button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 mb-4">
            <Icon name="AlertCircle" size={18} className="text-red-500 shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="corp-card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Icon name="Loader2" size={32} className="text-muted-foreground animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Загрузка сотрудников...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {['ФИО', 'Логин', 'Подразделение', 'Уровень доступа', ''].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {employees.map(emp => (
                    <tr key={emp.user_id} className="hover:bg-muted/30 transition-colors">
                      {editingId === emp.user_id ? (
                        <>
                          <td className="px-5 py-3">
                            <input
                              value={editData.full_name || ''}
                              onChange={e => setEditData(p => ({ ...p, full_name: e.target.value }))}
                              className="w-full px-2 py-1 border border-[hsl(var(--corp-blue))] rounded text-sm focus:outline-none"
                            />
                          </td>
                          <td className="px-5 py-3">
                            <input
                              value={editData.login || ''}
                              onChange={e => setEditData(p => ({ ...p, login: e.target.value }))}
                              className="w-full px-2 py-1 border border-[hsl(var(--corp-blue))] rounded text-sm focus:outline-none"
                            />
                          </td>
                          <td className="px-5 py-3">
                            <select
                              value={editData.department_id ?? 1}
                              onChange={e => setEditData(p => ({ ...p, department_id: Number(e.target.value) }))}
                              className="w-full px-2 py-1 border border-[hsl(var(--corp-blue))] rounded text-sm focus:outline-none"
                            >
                              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                          </td>
                          <td className="px-5 py-3">
                            <select
                              value={editData.role}
                              onChange={e => setEditData(p => ({ ...p, role: e.target.value as 'worker' | 'admin' }))}
                              className="w-full px-2 py-1 border border-[hsl(var(--corp-blue))] rounded text-sm focus:outline-none"
                            >
                              <option value="worker">Сотрудник</option>
                              <option value="admin">Администратор</option>
                            </select>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-1">
                              <button onClick={saveEdit} className="px-3 py-1 bg-[hsl(var(--corp-navy))] text-white text-xs rounded-lg font-semibold">Сохранить</button>
                              <button onClick={() => setEditingId(null)} className="px-3 py-1 border border-border text-xs rounded-lg font-semibold">Отмена</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[hsl(var(--corp-navy))]/10 flex items-center justify-center shrink-0">
                                <Icon name="User" size={14} className="text-[hsl(var(--corp-navy))]" />
                              </div>
                              <span className="font-medium text-foreground">{emp.full_name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{emp.login}</td>
                          <td className="px-5 py-3 text-foreground">{emp.department_name || '—'}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              emp.role === 'admin'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}>
                              <Icon name={emp.role === 'admin' ? 'ShieldCheck' : 'User'} size={11} />
                              {emp.role === 'admin' ? 'Администратор' : 'Сотрудник'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => startEdit(emp)}
                              className="p-1.5 text-muted-foreground hover:text-[hsl(var(--corp-blue))] hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Icon name="Pencil" size={14} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
