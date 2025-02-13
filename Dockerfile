# 1) Node에서 React 빌드
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Nginx로 최종 배포
FROM nginx:alpine
# 커스텀 Nginx 설정 (nginx.conf) 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# 빌드된 결과물을 Nginx html 폴더로 복사
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
