#FROM node:20
#
#MAINTAINER Some Dev
#
#RUN mkdir /app
#WORKDIR /app
#
#COPY ./package.json /app
#
#RUN npm i

# Використовуємо офіційний образ Node.js
FROM node

# Встановлюємо робочу директорію для контейнера
WORKDIR /app

# Копіюємо package.json та package-lock.json з каталогу backend
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код з каталогу backend
COPY . .

# Збираємо проект
RUN npm run build

# Запускаємо додаток
CMD ["npm", "run", "start"]