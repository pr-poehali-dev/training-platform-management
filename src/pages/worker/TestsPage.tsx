import { useState } from 'react';
import Layout from '@/components/Layout';
import { tests, courses } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface Props {
  user: { name: string; role: string; login: string };
  onHome: () => void;
  onLogout: () => void;
  onTestComplete: (result: { testId: number; score: number; passed: boolean }) => void;
}

type Stage = 'list' | 'taking' | 'result';

export default function TestsPage({ user, onHome, onLogout, onTestComplete }: Props) {
  const [stage, setStage] = useState<Stage>('list');
  const [selectedTest, setSelectedTest] = useState<typeof tests[0] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);

  const getCourse = (courseId: number) => courses.find(c => c.id === courseId);

  const startTest = (test: typeof tests[0]) => {
    setSelectedTest(test);
    setAnswers({});
    setResult(null);
    setStage('taking');
  };

  const selectAnswer = (questionId: number, answerId: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const submitTest = () => {
    if (!selectedTest) return;
    const correct = selectedTest.questions.filter(q => {
      const correctAnswer = q.answers.find(a => a.correct);
      return correctAnswer && answers[q.id] === correctAnswer.id;
    }).length;
    const score = Math.round((correct / selectedTest.questions.length) * 100);
    const passed = score >= 85;
    setResult({ score, passed, correct, total: selectedTest.questions.length });
    setStage('result');
    onTestComplete({ testId: selectedTest.id, score, passed });
  };

  const allAnswered = selectedTest
    ? selectedTest.questions.every(q => answers[q.id] !== undefined)
    : false;

  if (stage === 'result' && result && selectedTest) {
    return (
      <Layout title="Результат теста" onHome={onHome} user={user} onLogout={onLogout}>
        <div className="max-w-lg mx-auto animate-scale-in">
          <div className={`corp-card p-8 text-center border-2 ${result.passed ? 'border-emerald-200' : 'border-red-200'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${result.passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
              <Icon
                name={result.passed ? 'CheckCircle2' : 'XCircle'}
                size={40}
                className={result.passed ? 'text-emerald-600' : 'text-red-500'}
              />
            </div>

            <h2 className="font-golos font-bold text-foreground text-2xl mb-1">
              {result.passed ? 'Тест сдан!' : 'Тест не сдан'}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{selectedTest.title}</p>

            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-3xl font-bold mb-6 ${result.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
              {result.score}%
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-muted rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{result.correct}</div>
                <div className="text-muted-foreground">правильных</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{result.total - result.correct}</div>
                <div className="text-muted-foreground">ошибок</div>
              </div>
            </div>

            <div className={`text-sm px-4 py-3 rounded-lg mb-6 ${result.passed ? 'status-pass' : 'status-fail'}`}>
              {result.passed
                ? '✓ Поздравляем! Вы успешно прошли тестирование.'
                : '✗ Для прохождения требуется не менее 85%. Рекомендуем повторно изучить учебные материалы по теме.'}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStage('list')}
                className="flex-1 py-3 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm"
              >
                К списку тестов
              </button>
              {!result.passed && (
                <button
                  onClick={() => startTest(selectedTest)}
                  className="flex-1 py-3 border border-border hover:bg-muted text-foreground font-semibold rounded-lg transition-all text-sm"
                >
                  Пройти снова
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (stage === 'taking' && selectedTest) {
    const course = getCourse(selectedTest.courseId);
    return (
      <Layout title={selectedTest.title} onHome={onHome} user={user} onLogout={onLogout}>
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="mb-6">
            <button
              onClick={() => setStage('list')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-3"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-golos font-bold text-foreground text-xl">{selectedTest.title}</h2>
                {course && <p className="text-muted-foreground text-sm mt-0.5">Курс: {course.title}</p>}
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold text-foreground">{Object.keys(answers).length} / {selectedTest.questions.length}</div>
                <div className="text-muted-foreground">отвечено</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-[hsl(var(--corp-blue))] rounded-full transition-all"
                style={{ width: `${(Object.keys(answers).length / selectedTest.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-5">
            {selectedTest.questions.map((question, qi) => (
              <div key={question.id} className="corp-card p-5">
                <p className="font-golos font-semibold text-foreground text-sm mb-4">
                  <span className="text-[hsl(var(--corp-blue))] mr-2">Вопрос {qi + 1}.</span>
                  {question.text}
                </p>
                <div className="space-y-2">
                  {question.answers.map(answer => {
                    const selected = answers[question.id] === answer.id;
                    return (
                      <button
                        key={answer.id}
                        onClick={() => selectAnswer(question.id, answer.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-[hsl(var(--corp-blue))] bg-[hsl(var(--corp-blue))]/5 text-foreground font-medium'
                            : 'border-border hover:border-[hsl(var(--corp-blue))]/50 hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selected ? 'border-[hsl(var(--corp-blue))] bg-[hsl(var(--corp-blue))]' : 'border-border'
                          }`}>
                            {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          {answer.text}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {allAnswered ? 'Все вопросы отвечены' : `Осталось: ${selectedTest.questions.length - Object.keys(answers).length}`}
            </p>
            <button
              onClick={submitTest}
              disabled={!allAnswered}
              className="px-8 py-3 bg-[hsl(var(--corp-navy))] hover:bg-[hsl(221,70%,26%)] text-white font-semibold rounded-lg transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Icon name="Send" size={16} />
              Завершить тест
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Тесты" onHome={onHome} user={user} onLogout={onLogout}>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="font-golos font-bold text-foreground text-2xl mb-1">Доступные тесты</h2>
          <p className="text-muted-foreground text-sm">Для прохождения теста требуется результат не менее 85%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tests.map(test => {
            const course = getCourse(test.courseId);
            return (
              <button
                key={test.id}
                onClick={() => startTest(test)}
                className="corp-card p-5 text-left hover:shadow-md hover:border-[hsl(var(--corp-blue))]/40 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[hsl(var(--corp-navy))]/8 group-hover:bg-[hsl(var(--corp-navy))]/15 transition-colors flex items-center justify-center shrink-0">
                    <Icon name="ClipboardCheck" size={20} className="text-[hsl(var(--corp-navy))]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-golos font-semibold text-foreground text-base mb-1">{test.title}</h3>
                    {course && (
                      <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1">
                        <Icon name="BookOpen" size={12} />
                        {course.title}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="HelpCircle" size={12} />
                        {test.questions.length} вопросов
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        <Icon name="Target" size={12} />
                        Порог: 85%
                      </span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-[hsl(var(--corp-blue))] transition-colors shrink-0 mt-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
