FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json next.config.mjs postcss.config.js tailwind.config.ts next-env.d.ts ./
RUN npm install
COPY app ./app
COPY components ./components
COPY public ./public
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
