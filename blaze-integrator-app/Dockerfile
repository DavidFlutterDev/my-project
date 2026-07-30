FROM public.ecr.aws/docker/library/node:18.16.0-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app
COPY .npmrc /app
COPY set-yarn-registry.sh /set-yarn-registry.sh

RUN chmod +x /set-yarn-registry.sh
CMD ["/set-yarn-registry.sh"]

RUN npm install

COPY . /app

RUN npm run build:prod

FROM public.ecr.aws/nginx/nginx:1.24.0-alpine

# Each time Nginx is started it will perform variable substition in all template
# files found in `/etc/nginx/templates/*.template`, and copy the results (without
# the `.template` suffix) into `/etc/nginx/conf.d/`. Below, this will replace the
# original `/etc/nginx/conf.d/default.conf`; see https://hub.docker.com/_/nginx
COPY nginx/docker-nginx-default.conf /etc/nginx/templates/default.conf.template
COPY nginx/docker-defaults.sh /
COPY --from=build-step /app/dist/myapp /usr/share/nginx/html/blaze-integrator-app

# Just in case the file mode was not properly set in Git
RUN chmod +x /docker-defaults.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
