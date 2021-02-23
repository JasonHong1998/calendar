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

CREATE TABLE events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  name varchar(255) not null,
  calendar varchar(255) not null,
  color varchar(255) not null,
  start_time timestamptz not null,
  end_time timestamptz not null
);

CREATE TABLE todos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  day date not null,
  item varchar(255) not null,
  completion boolean not null
);