import { useState } from 'react';
import Layout from '@/components/Layout';
import { courses as initialCourses } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

type Course = typeof initialCourses[0];

const CATEGORIES = ['Безопасность', 'Корпоративная культура', 'ИТ-безопасность', 'Продажи', 'Другое'];

export default function TopicsPage({ user, onHome, onLogout }: Props) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showAdd, setShowAdd] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: CATEGORIES[0], duration: '' });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const addCourse = () => {
    if (!newCourse.title.trim()) return;
    const newId = Math.max(...courses.map(c => c.id), 0) + 1;
    setCourses(prev => [...prev, { id: newId, ...newCourse, materials: [] }]);
    setNewCourse({ title: '', description: '', category: CATEGORIES[0], duration: '' });
    setShowAdd(false);
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setDeletingId(null);
  };

  const categoryColors: Record<string, string> = {
    'Безопасность': 'bg-orange-50 text-orange-700 border-orange-200',
    'Корпоративная культура': 'bg-blue-50 text-blue-700 border-blue-200',
    'ИТ-безопасность': 'bg-purple-50 text-purple-700 border-purple-200',
    'Продажи': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Другое': 'bg-gray-50 text-gray-600 border-gray-200',
  };

  return (
    <Layout title="Управление курсами" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Темы и курсы</h2>
            <p className="text-muted-foreground text-sm">Управление учебными курсами и материалами</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm"
          >
            <Icon name="Plus" size={16} />
            Добавить курс
          </button>
        </div>

        {showAdd && (
          <div className="corp-card p-5 mb-5 border-[hsl(var(--corp-blue))]/30 border-2 animate-fade-in">
            <h3 className="font-golos font-semibold text-foreground text-sm mb-4">Новый курс</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Название курса</label>
                <input
                  value={newCourse.title}
                  onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))}
                  placeholder="Введите название курса"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Описание</label>
                <textarea
                  value={newCourse.description}
                  onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))}
                  placeholder="Краткое описание курса..."
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Категория</label>
                <select
                  value={newCourse.category}
                  onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Продолжительность</label>
                <input
                  value={newCourse.duration}
                  onChange={e => setNewCourse(p => ({ ...p, duration: e.target.value }))}
                  placeholder="напр. 4 часа"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Учебный материал (PDF)</label>
                <div className="border border-dashed border-border rounded-lg p-4 text-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Icon name="Upload" size={20} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Нажмите или перетащите PDF-файл</p>
                  <p className="text-xs text-muted-foreground mt-1">Будет доступно после подключения бэкенда</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={addCourse} className="px-4 py-2 bg-[hsl(var(--corp-navy))] text-white text-sm font-semibold rounded-lg hover:bg-[hsl(221,70%,26%)] transition-all">Создать курс</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-muted transition-all">Отмена</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="corp-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--corp-navy))]/8 flex items-center justify-center shrink-0">
                  <Icon name="BookOpen" size={20} className="text-[hsl(var(--corp-navy))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border mb-1 ${categoryColors[course.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {course.category}
                      </span>
                      <h3 className="font-golos font-semibold text-foreground text-base">{course.title}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="text-right mr-2">
                        <div className="text-xs text-muted-foreground">{course.duration}</div>
                        <div className="text-xs text-muted-foreground">{course.materials.length} матер.</div>
                      </div>
                      {deletingId === course.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-all"
                          >
                            Удалить
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-3 py-1.5 border border-border text-xs font-semibold rounded-lg hover:bg-muted transition-all"
                          >
                            Отмена
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(course.id)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Удалить курс"
                        >
                          <Icon name="Trash2" size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {course.materials.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {course.materials.map(m => (
                        <span key={m.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full">
                          <Icon name="FileText" size={11} />
                          {m.name}
                        </span>
                      ))}
                      <button className="flex items-center gap-1 text-xs px-2.5 py-1 border border-dashed border-border text-muted-foreground rounded-full hover:border-[hsl(var(--corp-blue))] hover:text-[hsl(var(--corp-blue))] transition-all">
                        <Icon name="Plus" size={11} />
                        Добавить PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
