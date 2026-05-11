import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

const GET_COURSES_URL = 'https://functions.poehali.dev/2c5d645d-2846-411e-a478-3ee8d852b7e8';

interface Course {
  course_id: number;
  title: string;
  description: string | null;
  materials_count: number;
}

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

export default function CoursesPage({ user, onHome, onLogout }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetch(GET_COURSES_URL)
      .then(r => r.json())
      .then(data => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        setCourses(parsed.courses || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить список курсов');
        setLoading(false);
      });
  }, []);

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
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2 bg-blue-50 text-blue-700 border-blue-200">
                      Информационная безопасность
                    </span>
                    <h2 className="font-golos font-bold text-foreground text-xl">{selectedCourse.title}</h2>
                    {selectedCourse.description && (
                      <p className="text-muted-foreground text-sm mt-1">{selectedCourse.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
                  <Icon name="FileText" size={14} />
                  <span>Материалов: {selectedCourse.materials_count}</span>
                </div>
              </div>

              <div className="corp-card p-6">
                <h3 className="font-golos font-semibold text-foreground text-base mb-4 flex items-center gap-2">
                  <Icon name="FileText" size={18} className="text-[hsl(var(--corp-blue))]" />
                  Учебные материалы
                </h3>
                {selectedCourse.materials_count === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                      <Icon name="FileX" size={22} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">Материалы пока не добавлены</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Array.from({ length: selectedCourse.materials_count }).map((_, i) => (
                      <div key={i} className="border border-border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                              <Icon name="FileText" size={16} className="text-red-600" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Материал {i + 1}</span>
                          </div>
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-200 font-mono">PDF</span>
                        </div>
                        <div className="bg-gray-50 h-48 flex items-center justify-center border-t border-border">
                          <div className="text-center">
                            <Icon name="Eye" size={28} className="text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">Просмотр PDF</p>
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
                    <span className="text-muted-foreground">ID курса</span>
                    <span className="font-mono font-medium text-foreground">#{selectedCourse.course_id}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Материалов</span>
                    <span className="font-medium text-foreground">{selectedCourse.materials_count}</span>
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
          <p className="text-muted-foreground text-sm">
            {loading ? 'Загрузка...' : `${courses.length} курсов по информационной безопасности`}
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 mb-5">
            <Icon name="AlertCircle" size={18} className="text-red-500 shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="corp-card p-12 text-center">
            <Icon name="Loader2" size={32} className="text-muted-foreground animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Загрузка курсов...</p>
          </div>
        ) : (
          <div className="corp-card overflow-hidden">
            <div className="divide-y divide-border">
              {courses.map((course, i) => (
                <button
                  key={course.course_id}
                  onClick={() => setSelectedCourse(course)}
                  className="w-full text-left px-5 py-4 hover:bg-muted/40 transition-colors group flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--corp-navy))]/8 flex items-center justify-center shrink-0 text-xs font-bold text-[hsl(var(--corp-navy))] font-mono">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm leading-snug">{course.title}</p>
                    {course.materials_count > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Icon name="FileText" size={11} />
                        {course.materials_count} материала
                      </p>
                    )}
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-[hsl(var(--corp-blue))] transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
