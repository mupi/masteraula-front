FROM node:10 as node
LABEL mantainer "hacklab/ <contato@hacklab.com.br>"

ARG REACT_APP_API_URL=https://api.masteraula.com.br
ENV REACT_APP_ENV=prod

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.19

COPY --from=node /app/build/ /usr/share/nginx/html/
