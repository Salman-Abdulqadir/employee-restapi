# use an existing docker image as a base node:alpine is minimal version of node
# alpine mostly refers to as small as possible version of an image
FROM node:14-alpine

# adding the work directory
WORKDIR /app

# the copy commands copies files from our local machine to the file system of the temporary container that is being made during the build process
COPY package.json yarn.lock ./

# run commands will run instruction when the image is in the building process
RUN yarn install

# # ENV DB_URL="mongodb+srv://salman:XJ0fFNbROVRE610s@cluster0.qijjvid.mongodb.net/employees?retryWrites=true&w=majority"
# ENV DB_URL="mongodb://mongo:27017/employees"

COPY . .

EXPOSE 3000
# is what runs when the image is launched after it has been built
CMD ["yarn", "start"]

# copying the path two times to reduce the time it takes when there are changes in the source folder.   