DROP DATABASE IF EXISTS fauxmazon_db;

create database fauxmazon_db;

use fauxmazon_db;

create table products (
item_id integer auto_increment not null,
product_name varchar(100),
department varchar(100),
price decimal(6, 2),
stock integer,
primary key (item_id)
);

insert into products (product_name, department, price, stock)
values ('neckless', 'clothing', 250.00, 100),
('sunglasses', 'clothing', 150.00, 5),
("Levi Jeans", "Apparel", 60, 35),
("Beach Towel", "Necessities", 29.99, 42),
("The Dark Knight", "Films", 15.00, 25),
("Equilibrium", "Films", 7.50, 57),
("Cards Against Humanity", "Board Games", 25.99, 35);