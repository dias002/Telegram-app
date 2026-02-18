# Telegram-app

Многоуровневый проект: Django backend + React frontend

## Структура
- `djangoApi/` — серверная часть (Django, DRF)
- `react-front/` — клиентская часть (React, axios, tailwind)

## Быстрый старт

### Backend (Django)
1. Перейти в папку `djangoApi`:
   ```sh
   cd djangoApi
   ```
2. Установить зависимости:
   ```sh
   pip install -r requirements.txt
   ```
3. Применить миграции:
   ```sh
   python manage.py migrate
   ```
4. Запустить сервер:
   ```sh
   python manage.py runserver
   ```

### Frontend (React)
1. Перейти в папку `react-front`:
   ```sh
   cd react-front
   ```
2. Установить зависимости:
   ```sh
   npm install
   ```
3. Запустить приложение:
   ```sh
   npm start
   ```

---

## Документация по частям
- [Инструкция для backend](djangoApi/README.md)
- [Инструкция для frontend](react-front/README.md)
