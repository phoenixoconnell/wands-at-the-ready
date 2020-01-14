CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(200),
    product_img TEXT,
    product_price INTEGER,
    product_desc VARCHAR(255)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    hash TEXT,
    isAdmin BOOLEAN
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    product_id INTEGER
);

ALTER TABLE cart
ADD FOREIGN KEY (product_id)
REFERENCES products (product_id);

ALTER TABLE cart
ADD FOREIGN KEY (user_id)
REFERENCES users (user_id);