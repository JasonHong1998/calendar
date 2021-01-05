DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

\c calendar;

--to import the uuid_generate_v4() method
create extension if not exists "uuid-ossp";

CREATE TABLE users (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) not null unique,
  password varchar(60) not null
);

CREATE TABLE tags (
  id serial primary key,
  name varchar(255) not null,
  color varchar(255) not null
);

CREATE TABLE events (
  id serial primary key,
  user_email varchar(255) references users(email),
  name varchar(255) not null,
  tag_id integer references tags(id),
  start_time timestamptz not null,
  end_time timestamptz not null
);

CREATE TABLE todos (
  id serial primary key,
  user_email varchar(255) references users(email),
  day date not null,
  item varchar(255) not null,
  completion boolean not null
);