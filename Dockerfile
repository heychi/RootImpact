# 1) Node 환경에서 React 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Nginx로 정적 파일 배포
FROM nginx:alpine
# 80 포트 노출
EXPOSE 80

# 빌드 결과물을 /usr/share/nginx/html 에 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 커스텀 nginx.conf (백엔드 프록시 등) 덮어쓰기
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
