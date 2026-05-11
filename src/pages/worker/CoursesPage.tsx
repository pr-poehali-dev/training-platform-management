import { useState } from 'react';
import Layout from '@/components/Layout';
import { courses } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

export default function CoursesPage({ user, onHome, onLogout }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const categoryColors: Record<string, string> = {
    'Безопасность': 'bg-orange-50 text-orange-700 border-orange-200',
    'Корпоративная культура': 'bg-blue-50 text-blue-700 border-blue-200',
    'ИТ-безопасность': 'bg-purple-50 text-purple-700 border-purple-200',
    'Продажи': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  if (selectedCourse) {
    return (
      <Layout title={selectedCourse.title} onHome={onHome} user={user} onLogout={onLogout}>
        <div className="animate-fade-in">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к курсам
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="corp-card p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--corp-navy))]/10 flex items-center justify-center shrink-0">
                    <Icon name="BookOpen" size={24} className="text-[hsl(var(--corp-navy))]" />
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2 ${categoryColors[selectedCourse.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                      {selectedCourse.category}
                    </span>
                    <h2 className="font-golos font-bold text-foreground text-xl">{selectedCourse.title}</h2>
                    <p className="text-muted-foreground text-sm mt-1">{selectedCourse.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
                  <Icon name="Clock" size={14} />
                  <span>Продолжительность: {selectedCourse.duration}</span>
                </div>
              </div>

              <div className="corp-card p-6">
                <h3 className="font-golos font-semibold text-foreground text-base mb-4 flex items-center gap-2">
                  <Icon name="FileText" size={18} className="text-[hsl(var(--corp-blue))]" />
                  Учебные материалы
                </h3>

                {selectedCourse.materials.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Материалы пока не добавлены</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCourse.materials.map(material => (
                      <div key={material.id} className="border border-border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                              <Icon name="FileText" size={16} className="text-red-600" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{material.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-200 font-mono">PDF</span>
                        </div>
                        <div className="bg-gray-50 h-64 flex items-center justify-center border-t border-border">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[hsl(var(--corp-navy))]/10 flex items-center justify-center mx-auto mb-3">
                              <Icon name="Eye" size={28} className="text-[hsl(var(--corp-navy))]" />
                            </div>
                            <p className="text-muted-foreground text-sm font-medium">Просмотр PDF</p>
                            <p className="text-muted-foreground text-xs mt-1">После подключения бэкенда файл отобразится здесь</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="corp-card p-5">
                <h3 className="font-golos font-semibold text-foreground text-sm mb-3">Информация о курсе</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Категория</span>
                    <span className="font-medium text-foreground">{selectedCourse.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Длительность</span>
                    <span className="font-medium text-foreground">{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Материалов</span>
                    <span className="font-medium text-foreground">{selectedCourse.materials.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Курсы" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Доступные курсы</h2>
          <p className="text-muted-foreground text-sm">Выберите курс для изучения учебных материалов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="corp-card p-5 text-left hover:shadow-md hover:border-[hsl(var(--corp-blue))]/40 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[hsl(var(--corp-navy))]/8 group-hover:bg-[hsl(var(--corp-navy))]/15 transition-colors flex items-center justify-center shrink-0">
                  <Icon name="BookOpen" size={20} className="text-[hsl(var(--corp-navy))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2 ${categoryColors[course.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {course.category}
                  </span>
                  <h3 className="font-golos font-semibold text-foreground text-base leading-snug mb-1">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="FileText" size={12} />
                      {course.materials.length} материала
                    </span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-[hsl(var(--corp-blue))] transition-colors shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
