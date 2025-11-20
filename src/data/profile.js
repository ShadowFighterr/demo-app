// src/data/profile.js
export const mockUser = {
  id: 1,
  fullName: "Аружан Бек",
  avatarUrl: null,
  email: "aruzhan@example.com",
  phones: ["+7 777 123 45 67", "+7 701 222 33 44"],
  position: "Product Manager",
  description: "Отвечаю за развитие Qollab и внутренние сервисы компании.",
  manager: "Ерлан Садыков, Head of Product",
  directReports: ["Динара К.", "Руслан М."],
  status: "vacation", // 'active' | 'vacation' | 'sick' | 'maternity'
  vacationDays: 12,
  balance: 45000,
  location: "Astana, KZ"
}

export const mockNotifications = [
  {
    id: 1,
    type: "task",
    title: "Завершить отчёт по Q3",
    message: "Дедлайн сегодня в 18:00",
    date: "2025-09-10 14:32",
    unread: true
  },
  {
    id: 2,
    type: "event",
    title: "All-hands митинг",
    message: "Завтра в 10:00, конференц-зал 3",
    date: "2025-09-09 09:10",
    unread: false
  },
  {
    id: 3,
    type: "news",
    title: "Новый соцпакет",
    message: "Обновлены условия ДМС и отпусков",
    date: "2025-09-05 11:05",
    unread: false
  }
]

export const mockRequestsHistory = [
  {
    id: 1,
    date: "2025-08-20",
    type: "Отпуск",
    title: "Отпуск 10 дней (сентябрь)",
    status: "Одобрено"
  },
  {
    id: 2,
    date: "2025-07-15",
    type: "IT запрос",
    title: "Замена ноутбука",
    status: "Выполнено"
  },
  {
    id: 3,
    date: "2025-06-02",
    type: "HR запрос",
    title: "Справка о доходах",
    status: "Закрыт"
  }
]
