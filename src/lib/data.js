// src/lib/data.js

// --- Публикации (Feed) ---
export const feed = [
  {
    id: 1,
    title: 'Общее собрание — результаты Q3',
    excerpt: 'Итоги третьего квартала: рост и планы...',
    date: '2025-09-10',
    team: 'HR команда'
  },
  {
    id: 2,
    title: 'Запущена новая программа благополучия',
    excerpt: 'Добавлена поддержка ментального здоровья...',
    date: '2025-08-01',
    team: 'People Ops'
  },
  {
    id: 3,
    title: 'Обновление по технике безопасности',
    excerpt: 'Небольшие изменения в протоколах безопасности...',
    date: '2025-07-12',
    team: 'Администрация офисов'
  }
]

// --- Сервисы компании ---
export const services = [
  // ПОДДЕРЖКА
  {
    id: 'it-helpdesk',
    name: 'IT Поддержка',
    category: 'Поддержка',
    description: 'Заявка на проблемы с ноутбуком, VPN, почтой или ПО.'
  },
  {
    id: 'hardware-request',
    name: 'Запрос оборудования',
    category: 'Поддержка',
    description: 'Запрос нового ноутбука, монитора, мышки или клавиатуры.'
  },
  {
    id: 'access-request',
    name: 'Доступ к системам',
    category: 'Поддержка',
    description: 'Запрос доступа к внутренним системам или папкам.'
  },

  // HR
  {
    id: 'vacation-request',
    name: 'Заявка на отпуск',
    category: 'HR',
    description: 'Создание запроса на отпуск или выходной.'
  },
  {
    id: 'sick-leave',
    name: 'Больничный',
    category: 'HR',
    description: 'Сообщение о больничном HR и руководителю.'
  },
  {
    id: 'hr-letters',
    name: 'Справки и письма HR',
    category: 'HR',
    description: 'Запрос справок о зарплате или подтверждения занятости.'
  },

  // ФИНАНСЫ
  {
    id: 'travel-expense',
    name: 'Отчёт о командировке',
    category: 'Финансы',
    description: 'Загрузка чеков и закрытие командировки.'
  },
  {
    id: 'invoice-payment',
    name: 'Оплата счета поставщика',
    category: 'Финансы',
    description: 'Передать счёт в финансы для оплаты.'
  },
  {
    id: 'corporate-card',
    name: 'Корпоративная карта',
    category: 'Финансы',
    description: 'Запрос новой карты или увеличение лимита.'
  },

  // ОПЕРАЦИИ
  {
    id: 'room-booking',
    name: 'Бронирование переговорной',
    category: 'Операции',
    description: 'Забронировать переговорную в офисе.'
  },
  {
    id: 'office-supplies',
    name: 'Канцелярия и материалы',
    category: 'Операции',
    description: 'Заказ ручек, тетрадей, флипчартов и расходников.'
  },
  {
    id: 'facility-issue',
    name: 'Проблемы в офисе',
    category: 'Операции',
    description: 'Сообщить о проблемах с кондиционером, светом или мебелью.'
  }
]
