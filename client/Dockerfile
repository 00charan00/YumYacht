FROM node:latest as build
WORKDIR .
COPY . .
CMD ["npm","install","&&","npm","run","build"]
FROM nginx:latest
COPY --from=build build/ /usr/share/nginx/html
EXPOSE 80