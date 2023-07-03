# Sample dockerfile for containerized environment.
FROM --platform=linux/amd64 node:20-slim

RUN apt-get update || : && apt-get install python-is-python3 make g++ -y

# Create and change to the app directory.

ARG USERNAME=handsomejang

RUN useradd $USERNAME

ENV HOME /user/$USERNAME
# used if using google cloud features
# ENV GOOGLE_APPLICATION_CREDENTIALS=

WORKDIR $HOME/app

COPY package.json yarn.lock .yarnrc.yml ./
# yarn runtime is included in .yarn/releases, so no need to run yarn set version
COPY .yarn ./.yarn

# Install production dependencies.
RUN yarn workspaces focus --production

# Copy local code to the container image.
# this code is the production build output.
COPY . ./

# Set user to run
# USER $USERNAME

# environment variable required for run
ENV PORT=

# serve entrypoint of your service by supplying start
ENTRYPOINT [ "yarn" ]
