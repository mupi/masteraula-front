FROM node:10 as node
LABEL mantainer "hacklab/ <contato@hacklab.com.br>"

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.19

COPY --from=node /app/build/ /usr/share/nginx/html/
