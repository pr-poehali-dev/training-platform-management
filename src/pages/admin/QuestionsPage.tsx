import { useState } from 'react';
import Layout from '@/components/Layout';
import { tests } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string };
  onHome: () => void;
  onLogout: () => void;
}

type Question = { id: number; text: string; testId: number; answers: { id: number; text: string; correct: boolean }[] };

export default function QuestionsPage({ user, onHome, onLogout }: Props) {
  const allQuestions: Question[] = tests.flatMap(t =>
    t.questions.map(q => ({
      id: q.id,
      text: q.text,
      testId: t.id,
      answers: q.answers.map(a => ({ id: a.id, text: a.text, correct: a.correct })),
    }))
  );

  const [questions, setQuestions] = useState<Question[]>(allQuestions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newQ, setNewQ] = useState({ text: '', testId: tests[0]?.id || 1 });

  const getTestName = (testId: number) => tests.find(t => t.id === testId)?.title || '—';

  const startEdit = (q: Question) => {
    setEditingId(q.id);
    setEditText(q.text);
  };

  const saveEdit = () => {
    setQuestions(prev => prev.map(q => q.id === editingId ? { ...q, text: editText } : q));
    setEditingId(null);
  };

  const deleteQ = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const addQuestion = () => {
    if (!newQ.text.trim()) return;
    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    setQuestions(prev => [...prev, {
      id: newId,
      text: newQ.text,
      testId: newQ.testId,
      answers: [],
    }]);
    setNewQ({ text: '', testId: tests[0]?.id || 1 });
    setShowAdd(false);
  };

  return (
    <Layout title="Вопросы" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-golos font-bold text-foreground text-2xl mb-1">База вопросов</h2>
            <p className="text-muted-foreground text-sm">Управление вопросами для тестов</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm"
          >
            <Icon name="Plus" size={16} />
            Добавить вопрос
          </button>
        </div>

        {showAdd && (
          <div className="corp-card p-5 mb-5 border-[hsl(var(--corp-blue))]/30 border-2 animate-fade-in">
            <h3 className="font-golos font-semibold text-foreground text-sm mb-4">Новый вопрос</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Тест</label>
                <select
                  value={newQ.testId}
                  onChange={e => setNewQ(prev => ({ ...prev, testId: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))]"
                >
                  {tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Текст вопроса</label>
                <textarea
                  value={newQ.text}
                  onChange={e => setNewQ(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Введите текст вопроса..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--corp-blue))] resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={addQuestion} className="px-4 py-2 bg-[hsl(var(--corp-navy))] text-white text-sm font-semibold rounded-lg hover:bg-[hsl(221,70%,26%)] transition-all">
                  Сохранить
                </button>
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-muted transition-all">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="corp-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Всего вопросов: {questions.length}
          </div>
          <div className="divide-y divide-border">
            {questions.map((q, i) => (
              <div key={q.id} className="px-5 py-4">
                {editingId === q.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-[hsl(var(--corp-blue))] rounded-lg text-sm bg-white focus:outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="px-3 py-1.5 bg-[hsl(var(--corp-navy))] text-white text-xs font-semibold rounded-lg">Сохранить</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1.5 border border-border text-foreground text-xs font-semibold rounded-lg">Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <span className="text-muted-foreground text-xs font-mono mt-0.5 w-6 shrink-0">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-sm font-medium mb-1">{q.text}</p>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        {getTestName(q.testId)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => startEdit(q)}
                        className="p-1.5 text-muted-foreground hover:text-[hsl(var(--corp-blue))] hover:bg-blue-50 rounded-lg transition-all"
                        title="Редактировать"
                      >
                        <Icon name="Pencil" size={14} />
                      </button>
                      <button
                        onClick={() => deleteQ(q.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
