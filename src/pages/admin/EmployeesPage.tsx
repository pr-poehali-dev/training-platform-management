import { useState } from 'react';
import Layout from '@/components/Layout';
import { users as initialUsers, departments } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

type User = typeof initialUsers[0];

export default function EmployeesPage({ user, onHome, onLogout }: Props) {
  const [employees, setEmployees] = useState<User[]>(initialUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', login: '', role: 'worker' as const, deptId: 1 });

  const getDept = (id: number) => departments.find(d => d.id === id)?.name || '—';

  const startEdit = (emp: User) => {
    setEditingId(emp.id);
    setEditData({ name: emp.name, login: emp.login, role: emp.role, deptId: emp.deptId });
  };

  const saveEdit = () => {
    setEmployees(prev => prev.map(e => e.id === editingId ? { ...e, ...editData } : e));
    setEditingId(null);
  };

  const addEmployee = () => {
    if (!newEmployee.name.trim() || !newEmployee.login.trim()) return;
    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    setEmployees(prev => [...prev, { id: newId, ...newEmployee }]);
    setNewEmployee({ name: '', login: '', role: 'worker', deptId: 1 });
    setShowAdd(false);
  };

  return (
    <Layout title="Сотрудники" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Сотрудники</h2>
            <p className="text-muted-foreground text-sm">Управление учётными записями</p>
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
                  value={newEmployee.name}
                  onChange={e => setNewEmployee(p => ({ ...p, name: e.target.value }))}
                  placeholder="Фамилия Имя Отчество"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Логин</label>
                <input
                  value={newEmployee.login}
                  onChange={e => setNewEmployee(p => ({ ...p, login: e.target.value }))}
                  placeholder="login"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Отдел</label>
                <select
                  value={newEmployee.deptId}
                  onChange={e => setNewEmployee(p => ({ ...p, deptId: Number(e.target.value) }))}
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

        <div className="corp-card overflow-hidden">
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
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    {editingId === emp.id ? (
                      <>
                        <td className="px-5 py-3">
                          <input
                            value={editData.name || ''}
                            onChange={e => setEditData(p => ({ ...p, name: e.target.value }))}
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
                            value={editData.deptId}
                            onChange={e => setEditData(p => ({ ...p, deptId: Number(e.target.value) }))}
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
                            <span className="font-medium text-foreground">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{emp.login}</td>
                        <td className="px-5 py-3 text-foreground">{getDept(emp.deptId)}</td>
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
        </div>
      </div>
    </Layout>
  );
}
