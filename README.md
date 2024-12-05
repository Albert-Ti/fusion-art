# Fusion Art

- Разработать сервис для асинхронного создания изображений с использованием API Fusion Brain.
- Сервис должен быть реализован с использованием следующих технологий: Docker, NestJS, Prisma ORM, Minio и API Fusion Brain.

## Инструкция подключения

### Npm:

```bash
cd [name-service]
npm install
npm run start:dev
npm run start:prod
```

### Docker:

Запуск проекта осуществляется несколькими способами:

1. через файл compose.yml:

```bash
# MODE - это переменная окружения, которая устанавливает, в каком режиме будет запушены сервисы.
# запуск всех сервисов командой из корневой папки где содержится файл
MODE=[dev|prod] docker compose up

# или одного:
MODE=[dev|prod] docker compose up [name-service]

# пересобрать образы и запустить заново
docker compose up -d --build
```

2. через Dockerfile:

```bash
# переходим в одну из папок сервиса, через терминал командой
cd [name-service]

# далее запускаем создание образа, где -t [name-image] именование образа
docker build -t [name-image] .

# и после уже запускаем контейнер образа name-image
# Где "--rm" удаляет контейнер после остановки(если это требуется)
# "-d" будет запущен в Dettach-режиме
# "-p 3000:5173" на каком порту будет запушен контейнер
docker run --rm -d -p 3000:5173 --name=front-container [name-image]
```
