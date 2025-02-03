CREATE DATABASE train_booking;
USE train_booking;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user'
);
CREATE TABLE trains (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    source VARCHAR(100),
    destination VARCHAR(100),
    total_seats INT,
    available_seats INT
);
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    train_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);
select *
from users;
select *
from trains;
select *
from bookings;
SHOW TABLES;
ALTER TABLE bookings
ADD COLUMN booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
DESC bookings;