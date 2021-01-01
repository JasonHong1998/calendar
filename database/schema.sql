DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

\c calendar;

--to import the uuid_generate_v4() method
create extension if not exists "uuid-ossp";

CREATE TABLE users (
  user_id uuid primary key default
  uuid_generate_v4(),
  user_email varchar(255) not null unique,
  user_password varchar(255) not null
);