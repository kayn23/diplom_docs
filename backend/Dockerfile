FROM ruby:3.1

WORKDIR /app

RUN apt-get update -qq && apt-get install -y postgresql-client

COPY Gemfile Gemfile.lock ./

RUN bundle config set without 'production'
RUN bundle config set jobs 1
RUN bundle install

COPY . .

CMD ["bash"]

