# Используем Node.js 18 в качестве базового образа
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходные файлы
COPY . .

# Открываем порт для сервера
EXPOSE 8000

# Запускаем приложение
CMD ["npm", "run", "start"]
