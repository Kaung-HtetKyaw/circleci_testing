FROM node:16

# install dependencies
RUN apt-get update \
    && apt-get install -y p11-kit libgmp10 unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/server

# use production environment
ENV NODE_ENV=production

# install dependencies with yarn
COPY ./package.json  ./
RUN yarn install --frozen-lockfile

# copy source
COPY ./build ./

CMD [ "yarn", "start" ]
