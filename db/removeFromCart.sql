DELETE FROM cart
WHERE user_id = $1
AND product_id = $2;

SELECT * FROM cart
WHERE user_id = $1;