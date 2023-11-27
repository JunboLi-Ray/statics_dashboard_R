CREATE schema basic;

CREATE TABLE data_a
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_name   VARCHAR(255) NOT NULL,
    action      VARCHAR(255) NOT NULL,
    content     VARCHAR(255) NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);