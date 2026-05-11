export const departments = [
  { id: 1, name: 'Отдел продаж' },
  { id: 2, name: 'ИТ-отдел' },
  { id: 3, name: 'Управление' },
  { id: 4, name: 'Бухгалтерия' },
  { id: 5, name: 'Отдел кадров' },
];

export const users = [
  { id: 1, name: 'Иванов Алексей Петрович', login: 'ivanov', role: 'worker', deptId: 1 },
  { id: 2, name: 'Смирнова Елена Викторовна', login: 'admin', role: 'admin', deptId: 3 },
  { id: 3, name: 'Петров Дмитрий Сергеевич', login: 'petrov', role: 'worker', deptId: 2 },
  { id: 4, name: 'Козлова Марина Александровна', login: 'kozlova', role: 'worker', deptId: 4 },
  { id: 5, name: 'Новиков Сергей Игоревич', login: 'novikov', role: 'worker', deptId: 1 },
  { id: 6, name: 'Морозова Анна Владимировна', login: 'morozova', role: 'worker', deptId: 5 },
];

export const courses = [
  {
    id: 1,
    title: 'Охрана труда и техника безопасности',
    description: 'Обязательный курс по охране труда для всех сотрудников предприятия. Включает правила безопасного поведения на рабочем месте.',
    category: 'Безопасность',
    duration: '4 часа',
    materials: [
      { id: 1, name: 'Введение в охрану труда.pdf', url: '#' },
      { id: 2, name: 'Правила пожарной безопасности.pdf', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'Корпоративная этика и стандарты',
    description: 'Курс знакомит с корпоративными ценностями, стандартами поведения и этическими нормами компании.',
    category: 'Корпоративная культура',
    duration: '2 часа',
    materials: [
      { id: 3, name: 'Кодекс корпоративной этики.pdf', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'Информационная безопасность',
    description: 'Основы защиты корпоративных данных, работы с конфиденциальной информацией и предотвращения кибератак.',
    category: 'ИТ-безопасность',
    duration: '3 часа',
    materials: [
      { id: 4, name: 'Политика ИБ.pdf', url: '#' },
      { id: 5, name: 'Руководство по паролям.pdf', url: '#' },
    ],
  },
  {
    id: 4,
    title: 'Навыки продаж и работа с клиентами',
    description: 'Техники эффективных продаж, работа с возражениями, построение долгосрочных отношений с клиентами.',
    category: 'Продажи',
    duration: '6 часов',
    materials: [
      { id: 6, name: 'Техники продаж.pdf', url: '#' },
    ],
  },
];

export const tests = [
  {
    id: 1,
    courseId: 1,
    title: 'Тест по охране труда',
    questions: [
      {
        id: 1,
        text: 'Что необходимо сделать при обнаружении пожара на рабочем месте?',
        answers: [
          { id: 1, text: 'Попытаться потушить огонь самостоятельно любыми средствами', correct: false },
          { id: 2, text: 'Немедленно сообщить по телефону 101 и эвакуироваться', correct: true },
          { id: 3, text: 'Закрыть дверь и продолжить работу', correct: false },
          { id: 4, text: 'Открыть окна для проветривания', correct: false },
        ],
      },
      {
        id: 2,
        text: 'С какой периодичностью проводится инструктаж по охране труда?',
        answers: [
          { id: 5, text: 'Один раз при приёме на работу', correct: false },
          { id: 6, text: 'Раз в 5 лет', correct: false },
          { id: 7, text: 'Не реже одного раза в год', correct: true },
          { id: 8, text: 'По мере необходимости', correct: false },
        ],
      },
      {
        id: 3,
        text: 'Что означает знак «Запрещается пользоваться открытым огнём»?',
        answers: [
          { id: 9, text: 'В данном месте запрещено курить', correct: false },
          { id: 10, text: 'Запрещено использование огня, искр и нагревательных приборов', correct: true },
          { id: 11, text: 'Запрещён вход с зажигалками', correct: false },
          { id: 12, text: 'Применяется только на складах', correct: false },
        ],
      },
      {
        id: 4,
        text: 'Какой документ регулирует охрану труда в организации?',
        answers: [
          { id: 13, text: 'Устав организации', correct: false },
          { id: 14, text: 'Трудовой договор', correct: false },
          { id: 15, text: 'Федеральный закон № 197-ФЗ «Трудовой кодекс РФ»', correct: true },
          { id: 16, text: 'Коллективный договор', correct: false },
        ],
      },
    ],
  },
  {
    id: 2,
    courseId: 2,
    title: 'Тест по корпоративной этике',
    questions: [
      {
        id: 5,
        text: 'Как следует поступить при обнаружении конфликта интересов?',
        answers: [
          { id: 17, text: 'Скрыть информацию и решить вопрос самостоятельно', correct: false },
          { id: 18, text: 'Незамедлительно сообщить руководителю', correct: true },
          { id: 19, text: 'Обсудить с коллегами', correct: false },
          { id: 20, text: 'Ничего не предпринимать', correct: false },
        ],
      },
      {
        id: 6,
        text: 'Что является нарушением корпоративной этики?',
        answers: [
          { id: 21, text: 'Помощь коллегам в рабочих вопросах', correct: false },
          { id: 22, text: 'Обсуждение размера зарплаты коллег в рабочее время', correct: true },
          { id: 23, text: 'Участие в корпоративных мероприятиях', correct: false },
          { id: 24, text: 'Обращение к руководству с предложениями', correct: false },
        ],
      },
      {
        id: 7,
        text: 'Как правильно общаться с клиентами?',
        answers: [
          { id: 25, text: 'В зависимости от настроения', correct: false },
          { id: 26, text: 'Всегда профессионально и вежливо', correct: true },
          { id: 27, text: 'Использовать сленг для неформальной атмосферы', correct: false },
          { id: 28, text: 'Только письменно', correct: false },
        ],
      },
    ],
  },
  {
    id: 3,
    courseId: 3,
    title: 'Тест по информационной безопасности',
    questions: [
      {
        id: 8,
        text: 'Какова минимальная длина надёжного пароля?',
        answers: [
          { id: 29, text: '6 символов', correct: false },
          { id: 30, text: '8 символов', correct: false },
          { id: 31, text: '12 символов и более', correct: true },
          { id: 32, text: '4 символа (PIN)', correct: false },
        ],
      },
      {
        id: 9,
        text: 'Что такое фишинговое письмо?',
        answers: [
          { id: 33, text: 'Рекламная рассылка', correct: false },
          { id: 34, text: 'Корпоративная новость', correct: false },
          { id: 35, text: 'Мошенническое письмо для кражи данных', correct: true },
          { id: 36, text: 'Системное уведомление', correct: false },
        ],
      },
      {
        id: 10,
        text: 'Как часто нужно менять рабочий пароль?',
        answers: [
          { id: 37, text: 'Никогда, если пароль надёжный', correct: false },
          { id: 38, text: 'Раз в 3–6 месяцев', correct: true },
          { id: 39, text: 'Раз в 5 лет', correct: false },
          { id: 40, text: 'Только при увольнении', correct: false },
        ],
      },
    ],
  },
];

export const testResults = [
  { id: 1, userId: 1, testId: 1, score: 100, passed: true, date: '2025-04-10' },
  { id: 2, userId: 1, testId: 2, score: 67, passed: false, date: '2025-04-15' },
  { id: 3, userId: 3, testId: 1, score: 75, passed: false, date: '2025-04-12' },
  { id: 4, userId: 3, testId: 3, score: 100, passed: true, date: '2025-05-01' },
  { id: 5, userId: 4, testId: 2, score: 100, passed: true, date: '2025-04-20' },
  { id: 6, userId: 5, testId: 1, score: 100, passed: true, date: '2025-04-25' },
  { id: 7, userId: 6, testId: 3, score: 67, passed: false, date: '2025-05-03' },
];
