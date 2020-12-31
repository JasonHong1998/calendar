DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

\c calendar;

CREATE TABLE users (
  id int auto_increment primary key not null,
  name varchar(255) not null,
  age int not null
);

CREATE TABLE events {
  id int auto_increment primary key not null,
  order_date date not null,
  salesperson_id int not null,
  amount int not null,
  FOREIGN KEY (salesperson_id)
    REFERENCES Salesperson(id)
}