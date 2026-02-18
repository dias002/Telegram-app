# Django backend (djangoApi)

## Описание
Серверная часть на Django + Django REST Framework.

### Основные команды
- Установка зависимостей:
  ```sh
  pip install -r requirements.txt
  ```
- Применение миграций:
  ```sh
  python manage.py migrate
  ```
- Запуск сервера:
  ```sh
  python manage.py runserver
  ```

### Структура
- `users/` — управление пользователями, регистрация, аутентификация
- `finance/` — финансы, категории, доходы, расходы

### Важно
- Не забудьте добавить .env и db.sqlite3 в .gitignore
- Для API авторизации используется JWT (см. users/serializers.py)
