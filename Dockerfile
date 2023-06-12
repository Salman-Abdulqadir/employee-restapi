FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

ENV DB_URL="mongodb+srv://salman:XJ0fFNbROVRE610s@cluster0.qijjvid.mongodb.net/employees?retryWrites=true&w=majority"

EXPOSE 4300

COPY . .

CMD ["yarn", "start"]