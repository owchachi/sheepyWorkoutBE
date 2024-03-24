FROM node:20.11-alpine3.18

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

CMD ["npx", "prisma", "migrate", "dev", "-name", "devMigration"]