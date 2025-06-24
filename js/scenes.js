const SCENES = [
    {
        id: 'scene-1',
        title: 'Этап 1: Анализ базы данных',
        intro: 'Вы открыли старую базу. Она не документирована. Начните с анализа её структуры.',
        tasks: [
          {
            type: 'quiz',
            question: 'Какой SQL-запрос показывает список таблиц в базе данных?',
            options: ['SHOW TABLES', 'LIST TABLES', 'GET TABLES', 'SELECT * FROM TABLES'],
            answer: 'SHOW TABLES'
          },
          {
            type: 'fill',
            question: 'Какой оператор используется для просмотра структуры таблицы?',
            answer: 'describe'
          },
          {
            type: 'quiz',
            question: 'Что нужно сделать в первую очередь перед модификацией структуры?',
            options: ['Сделать резервную копию', 'Удалить старые таблицы', 'Добавить новые индексы'],
            answer: 'Сделать резервную копию'
          }
        ]
      },
    {
      id: 'scene-2',
      title: 'Этап 2: Ключи и индексы',
      intro: 'Ты настраиваешь структуру таблиц. Важно понять, какие поля ключевые.',
      tasks: [
        {
          type: 'match',
          prompt: 'Сопоставьте термин и определение:',
          pairs: [
            { left: 'PRIMARY KEY', right: 'Уникальный идентификатор' },
            { left: 'FOREIGN KEY', right: 'Связь с другой таблицей' },
            { left: 'INDEX', right: 'Ускоряет поиск' }
          ]
        },
        {
          type: 'fill',
          question: 'Какой SQL-оператор создаёт индекс?',
          answer: 'create index'
        }
      ]
    },
    {
      id: 'scene-3',
      title: 'Этап 3: Нормализация',
      intro: 'Структура данных повреждена. Восстанови её с помощью нормальных форм.',
      tasks: [
        {
          type: 'quiz',
          question: 'Какая нормальная форма устраняет транзитивные зависимости?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          answer: '3NF'
        },
        {
          type: 'fill',
          question: 'Какая форма устраняет частичные зависимости?',
          answer: '2nf'
        }
      ]
    },
    {
      id: 'scene-4',
      title: 'Этап 4: ER‑диаграммы',
      intro: 'Связи между таблицами повреждены. Тебе нужно восстановить логику связей.',
      tasks: [
        {
          type: 'image-match',
          prompt: 'Соотнеси тип связи с диаграммой:',
          images: [
            { src: 'images/er1.png', label: '1:1' },
            { src: 'images/er2.png', label: '1:N' },
            { src: 'images/er3.png', label: 'M:N' }
          ]
        },
        {
          type: 'quiz',
          question: 'Какой тип связи используется для "один ко многим"?',
          options: ['1:1', '1:N', 'N:N'],
          answer: '1:N'
        }
      ]
    },
    {
        id: 'scene-5',
        title: 'Этап 5: Подготовка к запуску',
        intro: 'Вы почти закончили. Осталось протестировать запросы и убедиться в целостности.',
        tasks: [
          {
            type: 'fill',
            question: 'Какой SQL-запрос возвращает все записи из таблицы logs?',
            answer: 'select * from logs;'
          },
          {
            type: 'quiz',
            question: 'Какой оператор используется для фильтрации строк?',
            options: ['WHERE', 'HAVING', 'LIMIT', 'ORDER BY'],
            answer: 'WHERE'
          },
          {
            type: 'quiz',
            question: 'Что лучше всего использовать для ограничения количества результатов?',
            options: ['TOP', 'LIMIT', 'COUNT', 'OFFSET'],
            answer: 'LIMIT'
          }
        ]
      }
  ];
  