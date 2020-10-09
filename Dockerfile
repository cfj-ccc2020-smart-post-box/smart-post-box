FROM node:12.19.0-alpine
ENV TZ=Asia/Tokyo

WORKDIR /work/

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh
ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

COPY ./ /work/

RUN yarn install

RUN cd /work/express && yarn install

RUN cd /work/vue && yarn install

EXPOSE 3000
